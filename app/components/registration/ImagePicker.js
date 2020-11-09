import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import colors from "../../config/colors";

function AppImagePicker({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  // HANDLE ON PRESS AND UPDATE IMAGE URI
  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      //the properties in launchImageLibraryAsync means that you can only pick images, not videos.
      //And the quality is ranged between 0 and 1, so 0.5 is in the middle. 0.5 is good so we don't have to deal with a large upload when uploading to the server.
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      //Resize the image
      const manipResult = await ImageManipulator.manipulateAsync(result.uri, [
        { resize: { width: 500 } },
      ]);

      //When the user selects an image we call onChangeImage and notify the consumer of this component that the image is changed.
      if (!result.cancelled) onChangeImage(manipResult.uri);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <Image source={require("../../assets/imagepicker.png")}></Image>
        )}
        {imageUri && (
          <ImageBackground
            style={styles.container}
            source={require("../../assets/profile-img-bg.png")}
          >
            <Image source={{ uri: imageUri }} style={styles.image} />
          </ImageBackground>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.basicGrey,
    justifyContent: "center",
    overflow: "hidden",
    width: 150,
    height: 150,
  },
  image: {
    position: "relative",
    borderRadius: 75,
    width: "85%",
    height: "85%",
  },
});

export default AppImagePicker;
