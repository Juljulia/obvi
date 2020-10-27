import React, { useState, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import * as firebase from "firebase";
import "firebase/storage";

import Button from "../../components/Button";
import ImagePicker from "../../components/ImagePicker";
import FormScreen from "../../components/multiScreenForm/FormScreen";
import routes from "../../navigation/routes";
import useAuth from "../../auth/useAuth";
import NavArrow from "../../components/NavArrow";

function PhotoScreen({ navigation, route }) {
  const { username, pronoun, orientation, passions } = route.params;
  const { user } = useAuth();
  const [image, setImage] = useState();
  //Pass an empty string if the user doesn't choose an image
  const [imageData, setImageData] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow
          onPress={() =>
            navigation.navigate(routes.REGISTERLOCATION, {
              username,
              pronoun,
              orientation,
              passions,
              imageData,
            })
          }
        />
      ),
    });
  }, [navigation]);

  const handleImage = (uri) => {
    setImage(uri);
    setImageData(uri);
  };

  const uploadImage = async () => {
    if (image) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      const fileExtension = image.substring(image.lastIndexOf("/") + 1);
      const fileName = `${user.uid}.${fileExtension}`;

      const storageRef = firebase
        .storage()
        .ref()
        .child("images/" + fileName);

      var metadata = {
        contentType: "image/jpeg",
      };

      const uploadTask = storageRef.put(blob, metadata);

      uploadTask.on(
        "state_changed",
        function progress(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        function (error) {
          console.log(`Error uploading photo: ${error}`);
        },
        function complete() {
          console.log("Upload image completed");

          blob.close();

          storageRef.getDownloadURL().then(function (url) {
            setImageData(url);
          });
        }
      );
    }
  };
  return (
    <FormScreen
      title="Add photo"
      page="6"
      totalPages="7"
      onPress={() =>
        navigation.navigate(routes.REGISTERLOCATION, {
          username,
          pronoun,
          orientation,
          passions,
          imageData,
        })
      }
    >
      <ImagePicker imageUri={image} onChangeImage={handleImage} />
      <Button title="Upload" onPress={uploadImage}></Button>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PhotoScreen;
