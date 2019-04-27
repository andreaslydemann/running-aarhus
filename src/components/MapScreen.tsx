import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Localization, MapView } from "expo";
import { styled, theme } from "theme";
import { Coordinate } from "types/common";
import { calculateDistance } from "../utils";
import { Header, ScreenBackground, SubmitButton } from "./common";
import i18n from "i18n-js";
import axios from "axios";

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
const SPACING_COLOR = "#00000000";
const LINE_COLORS = [
  "#238C23",
  "#537f35",
  "#a6b267",
  "#e59c5d",
  "#6b5d8c",
  "#00007f"
];

interface State {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  meetingLocation: string;
  polylines: Coordinate[];
  startMarker: any;
  endMarker: any;
}

interface Props {
  navigation: { goBack: () => void };
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
      meetingLocation: "",
      startMarker: null,
      endMarker: null,
      polylines: []
    };
  }

  getColors() {
    let missingColors = this.state.polylines.length - LINE_COLORS.length;
    const colorsPerRound = Math.floor(missingColors / LINE_COLORS.length - 1);

    return LINE_COLORS.reduce((arr: string[], b: string, i: number) => {
      const colorArray = [...arr, b];

      if (missingColors > 0 && i < LINE_COLORS.length - 1) {
        for (let i = 0; i < colorsPerRound; i++) {
          colorArray.push(SPACING_COLOR);
          missingColors--;
        }
      }

      return colorArray;
    }, []);
  }

  resetState() {
    this.setState({
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      meetingLocation: "",
      startMarker: null,
      endMarker: null,
      polylines: []
    });
  }

  undoLine() {
    const { polylines } = this.state;

    if (polylines.length === 1) {
      this.resetState();
    } else if (polylines.length > 1) {
      this.setState({
        polylines: polylines.slice(0, -1)
      });
    }
  }

  setMarker(e: any) {
    const { startMarker, endMarker, polylines } = this.state;

    if (!startMarker) {
      this.setState(
        {
          startMarker: {
            coordinate: e.nativeEvent.coordinate,
            color: START_MARKER_COLOR
          },
          polylines: [e.nativeEvent.coordinate]
        },
        () => {
          this.getAddress().then(address => {
            this.setState({
              meetingLocation: address
            });
          });
        }
      );
    } else if (!endMarker) {
      this.setState(
        {
          endMarker: {
            coordinate: e.nativeEvent.coordinate,
            color: END_MARKER_COLOR
          },
          polylines: [...polylines, e.nativeEvent.coordinate]
        },
        () => this.focusOnRoute()
      );
    }
  }

  focusOnRoute() {
    const { polylines } = this.state;

    const latitudes = polylines.map(line => line.latitude);
    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);

    const longitudes = polylines.map(line => line.longitude);
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);

    const coordinates = [
      { latitude: minLatitude, longitude: minLongitude },
      { latitude: maxLatitude, longitude: maxLongitude }
    ];

    this.map.fitToCoordinates(coordinates, {
      edgePadding: DEFAULT_PADDING,
      animated: true
    });
  }

  onDrawLine(e: any) {
    const { startMarker, endMarker, polylines } = this.state;

    if (!startMarker || endMarker) {
      return;
    }

    if (!polylines.length) {
      this.setState({
        polylines: [e.nativeEvent.coordinate]
      });
    } else {
      this.setState({
        polylines: [...polylines, e.nativeEvent.coordinate]
      });
    }
  }

  onStartMarkerPress(e: any) {
    const { endMarker, polylines } = this.state;

    if (endMarker || polylines.length <= 1) {
      return;
    }

    this.setState(
      {
        startMarker: null,
        endMarker: {
          coordinate: e.nativeEvent.coordinate,
          color: END_MARKER_COLOR
        },
        polylines: [...polylines, e.nativeEvent.coordinate]
      },
      () => this.focusOnRoute()
    );
  }

  async getAddress() {
    const REVERSE_GEOCODE_URL =
      "http://nominatim.openstreetmap.org/reverse?format=json";

    if (this.state.startMarker) {
      const { latitude, longitude } = this.state.startMarker.coordinate;

      const {
        data: { address }
      } = await axios.get(
        `${REVERSE_GEOCODE_URL}&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1";`
      );

      return `${address.house_number ? address.house_number + " " : ""}${
        address.road ? address.road + ", " : ""
      }${address.suburb ? address.suburb + ", " : ""}${
        address.postcode ? address.postcode : ""
      }`;
    }

    return "";
  }

  render() {
    let distance = 0;
    if (this.state.polylines.length > 1) {
      const { polylines } = this.state;
      let lastCoordinate;

      for (let i = 0; i < polylines.length; i++) {
        if (lastCoordinate) {
          distance += calculateDistance(lastCoordinate, polylines[i]);
        } else {
          distance += calculateDistance(polylines[i], polylines[i + 1]);
        }

        lastCoordinate = polylines[i];
      }
    }

    const pace = 4;
    let endTimeString;

    if (pace) {
      const date = new Date();

      date.setMinutes(date.getMinutes() + pace * distance);
      endTimeString = date.toLocaleTimeString(Localization.locale, {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
      });
    }

    return (
      <Wrapper>
        <Header
          navigateBack={() => this.props.navigation.goBack()}
          ScreenTitle={i18n.t("createRunTitle")}
        />
        <View style={styles.map}>
          <View style={styles.map}>
            <MapView
              showsUserLocation={true}
              provider={PROVIDER_DEFAULT}
              ref={(ref: any) => {
                this.map = ref;
              }}
              style={styles.map}
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
                coordinates={this.state.polylines}
                strokeColor="rgba(0,0,0,0.5)"
                strokeColors={
                  this.state.endMarker ? this.getColors() : undefined
                }
                strokeWidth={this.state.endMarker ? 2 : 1}
                lineDashPattern={!this.state.endMarker ? [20, 5] : null}
              />
            </MapView>
            <MapOverlay>
              {this.state.polylines.length ? (
                <TextWrapper
                  borderColor={"transparent"}
                  backgroundColor={theme.primary}
                >
                  <DetailsTextWrapper>
                    <DetailsField>Mødested: </DetailsField>
                    <DetailsText>{this.state.meetingLocation}</DetailsText>
                  </DetailsTextWrapper>
                  <DetailsTextWrapper>
                    <DetailsField>Afstand: </DetailsField>
                    <DetailsText>{distance.toFixed(2)} km</DetailsText>
                  </DetailsTextWrapper>
                  {pace ? (
                    <DetailsTextWrapper>
                      <DetailsField>Slut-tidspunkt: </DetailsField>
                      <DetailsText>kl. {endTimeString}</DetailsText>
                    </DetailsTextWrapper>
                  ) : null}
                </TextWrapper>
              ) : null}

              <TextWrapper
                borderColor={theme.inactiveTint}
                backgroundColor={theme.activeTint}
              >
                <HelpText>
                  Start- og slut-markøren for ruten sættes ved at holde din
                  finger et sted på kortet.
                </HelpText>
              </TextWrapper>
              {(this.state.startMarker || this.state.endMarker) && (
                <ButtonWrapper>
                  <UndoButton
                    onPress={() =>
                      !this.state.endMarker
                        ? this.undoLine()
                        : this.resetState()
                    }
                  >
                    {!this.state.endMarker ? (
                      <Text>Undo</Text>
                    ) : (
                      <Text>Clear route</Text>
                    )}
                  </UndoButton>
                </ButtonWrapper>
              )}
            </MapOverlay>
          </View>
        </View>

        <SubmitButton
          onPress={() => {
            console.log("clicked");
          }}
          title={"Gem"}
        />
      </Wrapper>
    );
  }
}

const MapOverlay = styled.View`
  position: absolute;
`;

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
`;

const UndoButton = styled.TouchableOpacity`
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

const DetailsTextWrapper = styled.View`
  flex-direction: row;
`;

const DetailsField = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
`;

const DetailsText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    flex: 1
  }
});

export default MapScreen;
