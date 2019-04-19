import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { MapView, PROVIDER_DEFAULT } from "expo";

// @ts-ignore
const { Marker, Polyline } = MapView;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 56.1501;
const LONGITUDE = 10.1861;
const LATITUDE_DELTA = 0.1222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
const COLORS = [
  "#238C23",
  "#537f35",
  "#a6b267",
  "#e59c5d",
  "#004e8c",
  "#00007f"
];

interface State {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  polylines: any;
  editing: any;
  startMarker: any;
  endMarker: any;
}

class MapScreen extends React.Component<void, State> {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      polylines: [],
      editing: null,
      startMarker: null,
      endMarker: null
    };
  }

  resetState() {
    this.setState({
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      polylines: [],
      editing: null,
      startMarker: null,
      endMarker: null
    });
  }

  undoLine() {
    if (this.state.editing.coordinates.length === 1) {
      this.resetState();
    } else if (this.state.editing.coordinates.length > 1) {
      console.log(this.state);
      const popped = this.state.editing.coordinates.slice(0, -1);
      console.log(popped);
      this.setState({
        ...this.state,
        editing: {
          id: id++,
          coordinates: popped
        }
      });
    }
    console.log(this.state.editing);
  }

  setMarker(e: any) {
    if (!this.state.startMarker) {
      this.setState({
        ...this.state,
        startMarker: {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: "#238C23"
        },
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate]
        }
      });
    } else if (!this.state.endMarker) {
      this.setState({
        ...this.state,
        endMarker: {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: "#00007f"
        }
      });

      const { polylines, editing } = this.state;
      const theend = {
        ...editing,
        coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
      };
      this.setState(
        {
          polylines: [...polylines, theend],
          editing: null
        },
        () => this.focus()
      );
    }
  }

  focus() {
    const latitudes = this.state.polylines[0].coordinates.map(
      line => line.latitude
    );
    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);

    const longitudes = this.state.polylines[0].coordinates.map(
      line => line.longitude
    );
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);

    const minObj = { latitude: minLatitude, longitude: minLongitude };
    const maxObj = { latitude: maxLatitude, longitude: maxLongitude };

    console.log(minObj, maxObj);

    this.map.fitToCoordinates([minObj, maxObj], {
      edgePadding: DEFAULT_PADDING,
      animated: true
    });
  }

  onPanDrag(e) {
    if (!this.state.startMarker || this.state.endMarker) {
      return;
    }
    const { editing } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate]
        }
      });
    } else {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
        }
      });
    }
  }

  onStartMarkerPress(e) {
    if (!this.state.endMarker && this.state.editing.coordinates.length > 1) {
      this.setState({
        ...this.state,
        startMarker: null,
        endMarker: {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: "#00007f"
        }
      });

      const { polylines, editing } = this.state;
      const theend = {
        ...editing,
        coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
      };
      this.setState(
        {
          polylines: [...polylines, theend],
          editing: null
        },
        () => this.focus()
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
          initialRegion={this.state.region}
          onPress={e => this.onPanDrag(e)}
          onLongPress={e => this.setMarker(e)}
        >
          {this.state.startMarker && (
            <Marker
              identifier="startMarker"
              key={this.state.startMarker.key}
              coordinate={this.state.startMarker.coordinate}
              pinColor={this.state.startMarker.color}
              onSelect={e => this.onStartMarkerPress(e)}
            />
          )}
          {this.state.endMarker && (
            <Marker
              identifier="endMarker"
              key={this.state.endMarker.key}
              coordinate={this.state.endMarker.coordinate}
              pinColor={this.state.endMarker.color}
            />
          )}
          {this.state.polylines.map(polyline => (
            <Polyline
              key={polyline.id}
              coordinates={polyline.coordinates}
              strokeColor="#000"
              strokeColors={COLORS}
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
            />
          ))}
          {this.state.editing && (
            <Polyline
              key="editingPolyline"
              coordinates={this.state.editing.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.pop()}
        >
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>&larr;</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          {(this.state.startMarker || this.state.endMarker) && (
            <TouchableOpacity
              onPress={() =>
                this.state.editing ? this.undoLine() : this.resetState()
              }
              style={[styles.bubble, styles.button]}
            >
              {this.state.editing ? (
                <Text>Undo</Text>
              ) : (
                <Text>Clear route</Text>
              )}
            </TouchableOpacity>
          )}
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
  latlng: {
    width: 200,
    alignItems: "stretch"
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
