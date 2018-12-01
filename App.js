import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Camera, Permissions } from "expo";

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  snap = async () => {
    if (this.camera) {
      console.log("SNAPPING PICTURE");
      let photo = await this.camera.takePictureAsync();
      console.log(photo.uri);
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <Camera
            style={styles.camera}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <TouchableOpacity
              style={styles.flipContainer}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
            >
              <Text style={styles.flip}> FLIP </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.snap} style={styles.snapContainer}>
              <Text style={styles.snap}>SNAP PICTURE</Text>
            </TouchableOpacity>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  snapContainer: {
    flex: 1,
    opacity: 0.8,
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 1
  },
  snap: {
    color: "#87ceeb",
    margin: 5
  },
  flipContainer: {
    flex: 1,
    opacity: 0.8,
    height: "10%",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87ceeb",
    borderRadius: 1
  },
  flip: {
    color: "#fff",
    margin: 5
  }
});
