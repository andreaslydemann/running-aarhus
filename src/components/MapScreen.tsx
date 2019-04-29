import React from "react";
import { Text, Dimensions } from "react-native";
import { MapView } from "expo";
import { styled, theme } from "theme";
import { Coordinate } from "types/common";
import {
  getAddressOfCoordinate,
  calculateEndDateTime,
  getDistanceOfCoordinates,
  getColorsOfCoordinates
} from "utils";
import { Header, RouteSummary, ScreenBackground, SubmitButton } from "./common";
import i18n from "i18n-js";

// @ts-ignore
const { Marker, Polyline, PROVIDER_DEFAULT } = MapView;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 56.1501;
const LONGITUDE = 10.1861;
const LATITUDE_DELTA = 0.1222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 200, right: 40, bottom: 40, left: 40 };
const START_MARKER_COLOR = "#238C23";
const END_MARKER_COLOR = "#00007f";

interface State {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  meetingPoint: string;
  coordinates: Coordinate[];
  startMarker: any;
  endMarker: any;
}

interface Props {
  navigation: {
    goBack: () => void;
    getParam: (param: string) => any;
  };
}

interface MapScreen {
  map: {
    fitToCoordinates: (
      coordinates: any,
      options: {
        edgePadding: any;
        animated: boolean;
      }
    ) => void;
  };
}

class MapScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      meetingPoint: "",
      startMarker: null,
      endMarker: null,
      coordinates: []
    };
  }

  componentDidMount() {
    const coordinates = this.props.navigation.getParam("coordinates");
    const meetingPoint = this.props.navigation.getParam("meetingPoint");

    if (!(coordinates.length && meetingPoint)) return;

    const startMarker = {
      coordinate: coordinates[0],
      color: START_MARKER_COLOR
    };

    const endMarker = {
      coordinate: coordinates[coordinates.length - 1],
      color: END_MARKER_COLOR
    };

    this.setState(
      {
        meetingPoint,
        coordinates,
        startMarker,
        endMarker
      },
      () => {
        this.focusOnRoute();
      }
    );
  }

  resetState() {
    this.setState({
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      meetingPoint: "",
      startMarker: null,
      endMarker: null,
      coordinates: []
    });
  }

  undoLine() {
    const { coordinates } = this.state;

    if (coordinates.length === 1) {
      this.resetState();
    } else if (coordinates.length > 1) {
      this.setState({
        coordinates: coordinates.slice(0, -1)
      });
    }
  }

  setMarker(e: any) {
    const { startMarker, endMarker, coordinates } = this.state;

    if (!startMarker) {
      this.setState(
        {
          startMarker: {
            coordinate: e.nativeEvent.coordinate,
            color: START_MARKER_COLOR
          },
          coordinates: [e.nativeEvent.coordinate]
        },
        () => {
          getAddressOfCoordinate(this.state.startMarker.coordinate).then(
            meetingPoint => {
              this.setState({
                meetingPoint
              });
            }
          );
        }
      );
    } else if (!endMarker) {
      this.setState(
        {
          endMarker: {
            coordinate: e.nativeEvent.coordinate,
            color: END_MARKER_COLOR
          },
          coordinates: [...coordinates, e.nativeEvent.coordinate]
        },
        () => this.focusOnRoute()
      );
    }
  }

  focusOnRoute() {
    const { coordinates } = this.state;

    const latitudes = coordinates.map(line => line.latitude);
    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);

    const longitudes = coordinates.map(line => line.longitude);
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);

    const focusCoordinates = [
      { latitude: minLatitude, longitude: minLongitude },
      { latitude: maxLatitude, longitude: maxLongitude }
    ];

    this.map.fitToCoordinates(focusCoordinates, {
      edgePadding: DEFAULT_PADDING,
      animated: true
    });
  }

  onDrawLine(e: any) {
    const { startMarker, endMarker, coordinates } = this.state;

    if (!startMarker || endMarker) {
      return;
    }

    if (!coordinates.length) {
      this.setState({
        coordinates: [e.nativeEvent.coordinate]
      });
    } else {
      this.setState({
        coordinates: [...coordinates, e.nativeEvent.coordinate]
      });
    }
  }

  onStartMarkerPress(e: any) {
    const { endMarker, coordinates } = this.state;

    if (endMarker || coordinates.length <= 1) {
      return;
    }

    this.setState(
      {
        startMarker: null,
        endMarker: {
          coordinate: e.nativeEvent.coordinate,
          color: END_MARKER_COLOR
        },
        coordinates: [...coordinates, e.nativeEvent.coordinate]
      },
      () => this.focusOnRoute()
    );
  }

  render() {
    const { navigation } = this.props;
    const pace = navigation.getParam("pace");
    const startDateTime = navigation.getParam("startDateTime");

    const distance = getDistanceOfCoordinates(this.state.coordinates);
    const endDateTime = calculateEndDateTime(startDateTime, pace, distance);

    return (
      <Wrapper>
        <Header
          navigateBack={() => this.props.navigation.goBack()}
          ScreenTitle={i18n.t("createRunTitle")}
        />
        <MapViewWrapper>
          <StyledMapView
            showsUserLocation={true}
            provider={PROVIDER_DEFAULT}
            ref={(ref: any) => {
              this.map = ref;
            }}
            initialRegion={this.state.region}
            onPress={e => this.onDrawLine(e)}
            onLongPress={e => this.setMarker(e)}
          >
            {this.state.startMarker && (
              <Marker
                coordinate={this.state.startMarker.coordinate}
                pinColor={this.state.startMarker.color}
                onSelect={(e: any) => this.onStartMarkerPress(e)}
              />
            )}
            {this.state.endMarker && (
              <Marker
                coordinate={this.state.endMarker.coordinate}
                pinColor={this.state.endMarker.color}
              />
            )}
            <Polyline
              coordinates={this.state.coordinates}
              strokeColor="rgba(0,0,0,0.5)"
              strokeColors={
                this.state.endMarker
                  ? getColorsOfCoordinates(this.state.coordinates)
                  : undefined
              }
              strokeWidth={this.state.endMarker ? 2 : 1}
              lineDashPattern={!this.state.endMarker ? [20, 5] : null}
            />
          </StyledMapView>
          <MapOverlay>
            {this.state.coordinates.length ? (
              <TextWrapper
                borderColor={"transparent"}
                backgroundColor={theme.primary}
              >
                <RouteSummary
                  routeDetails={{
                    meetingPoint: this.state.meetingPoint,
                    distance,
                    endDateTime
                  }}
                  showEndDateTime={!!pace}
                />
              </TextWrapper>
            ) : null}

            <TextWrapper
              borderColor={theme.inactiveTint}
              backgroundColor={theme.activeTint}
            >
              <HelpText>
                Start- og slut-markøren for ruten sættes ved at holde din finger
                et sted på kortet.
              </HelpText>
            </TextWrapper>
            {(this.state.startMarker || this.state.endMarker) && (
              <UndoButton
                onPress={() =>
                  !this.state.endMarker ? this.undoLine() : this.resetState()
                }
              >
                {!this.state.endMarker ? <Text>Undo</Text> : <Text>Clear</Text>}
              </UndoButton>
            )}
          </MapOverlay>
        </MapViewWrapper>

        <SubmitButton
          disabled={!this.state.endMarker}
          onPress={() => {
            const { coordinates, meetingPoint } = this.state;
            const onConfirmRoute = this.props.navigation.getParam(
              "onConfirmRoute"
            );

            onConfirmRoute({
              meetingPoint,
              distance,
              endDateTime,
              coordinates
            });

            this.props.navigation.goBack();
          }}
          title={"Gem"}
        />
      </Wrapper>
    );
  }
}

const MapViewWrapper = styled.View`
  flex: 1;
`;

const StyledMapView = styled(MapView)`
  flex: 1;
`;

const MapOverlay = styled.View`
  position: absolute;
`;

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const UndoButton = styled.TouchableOpacity`
  align-self: flex-end;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  shadow-offset: 0px 0px;
  background-color: white;
  top: 10px;
  right: 10;
  width: 80px;
  padding: 12px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const HelpText = styled.Text`
  color: ${({ theme }) => theme.primary};
`;

interface TextWrapperProps {
  borderColor: string;
  backgroundColor: string;
}

const TextWrapper = styled.View<TextWrapperProps>`
  border-color: ${props => props.borderColor};
  border-bottom-width: 1px;
  background-color: ${props => props.backgroundColor};
  padding: 15px 15px;
`;

export default MapScreen;
