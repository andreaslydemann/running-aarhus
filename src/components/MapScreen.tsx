import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { MapView } from "expo";

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
const SPACING_COLOR = "#00000000";
const LINE_COLORS = [
  "#238C23",
  "#537f35",
  "#a6b267",
  "#e59c5d",
  "#004e8c",
  "#00007f"
];

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface State {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
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
      this.setState({
        startMarker: {
          coordinate: e.nativeEvent.coordinate,
          color: START_MARKER_COLOR
        },
        polylines: [e.nativeEvent.coordinate]
      });
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

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
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
            coordinates={this.state.polylines}
            strokeColor="rgba(0,0,200,0.5)"
            strokeColors={this.state.endMarker ? this.getColors() : undefined}
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={2}
            lineDashPattern={!this.state.endMarker ? [20, 5] : null}
          />
        </MapView>
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>&larr;</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          {(this.state.startMarker || this.state.endMarker) && (
            <TouchableOpacity
              onPress={() =>
                !this.state.endMarker ? this.undoLine() : this.resetState()
              }
              style={[styles.bubble, styles.button]}
            >
              {!this.state.endMarker ? (
                <Text>Undo</Text>
              ) : (
                <Text>Clear route</Text>
              )}
            </TouchableOpacity>
          )}
          {(this.state.startMarker || this.state.endMarker) && (
            <TouchableOpacity
              onPress={() =>
                !this.state.endMarker ? this.undoLine() : this.resetState()
              }
              style={[styles.bubble, styles.button]}
            >
              {!this.state.endMarker ? (
                <Text>Undo</Text>
              ) : (
                <Text>Clear route</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text>
            The yellow markers have a higher zIndex and appear above other
            markers.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 4,
    marginHorizontal: 40,
    marginVertical: 20,
    padding: 10
  },
  back: {
    position: "absolute",
    top: 20,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.4)",
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MapScreen;
