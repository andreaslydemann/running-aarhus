import React, { Component } from "react";
import { Dimensions } from "react-native";
import { MapView } from "expo";
import { styled } from "theme";
import { Coordinate } from "types/common";
import { getColorsOfCoordinates } from "utils";
import { Header, ScreenBackground } from "./common";
import i18n from "i18n-js";

// @ts-ignore
const { Marker, Polyline, PROVIDER_DEFAULT } = MapView;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 56.1501;
const LONGITUDE = 10.1861;
const LATITUDE_DELTA = 0.1222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
const START_MARKER_COLOR = "#238C23";
const END_MARKER_COLOR = "#00007f";

interface Props {
  navigation: {
    goBack: () => void;
    getParam: (param: string) => any;
  };
}

interface ShowRouteScreen {
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

class ShowRouteScreen extends Component<Props> {
  focusOnRoute(coordinates: Coordinate[]) {
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

  render() {
    const { navigation } = this.props;

    const coordinates = this.props.navigation.getParam("coordinates");

    const startMarker = {
      coordinate: coordinates[0],
      color: START_MARKER_COLOR
    };

    const endMarker = {
      coordinate: coordinates[coordinates.length - 1],
      color: END_MARKER_COLOR
    };

    const region = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    return (
      <Wrapper>
        <Header
          navigateBack={() => navigation.goBack()}
          ScreenTitle={i18n.t("showRouteTitle")}
          isModal={true}
        />
        <MapViewWrapper>
          <StyledMapView
            provider={PROVIDER_DEFAULT}
            ref={(ref: any) => {
              this.map = ref;
            }}
            initialRegion={region}
            onLayout={() => this.focusOnRoute(coordinates)}
          >
            {startMarker && (
              <Marker
                coordinate={startMarker.coordinate}
                pinColor={startMarker.color}
              />
            )}
            {endMarker && (
              <Marker
                coordinate={endMarker.coordinate}
                pinColor={endMarker.color}
              />
            )}
            <Polyline
              coordinates={coordinates}
              strokeColor="rgba(0,0,0,0.5)"
              strokeColors={getColorsOfCoordinates(coordinates)}
              strokeWidth={2}
            />
          </StyledMapView>
        </MapViewWrapper>
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

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

export default ShowRouteScreen;
