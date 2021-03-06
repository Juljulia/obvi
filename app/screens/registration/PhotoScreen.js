import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import * as firebase from "firebase";
import "firebase/storage";

import colors from "../../config/colors";
import FormScreen from "../../components/registration/FormScreen";
import H2 from "../../components/typography/H2";
import routes from "../../navigation/routes";
import useAuth from "../../auth/useAuth";
import NavArrow from "../../components/nav/NavArrow";
import PhotoCard from "../../components/registration/PhotoCard";
import Screen from "../../components/Screen";
import { screen } from "../../config/dimensions";

function PhotoScreen({ navigation, route }) {
  const {
    username,
    pronoun,
    showPronoun,
    orientation,
    showOrientation,
    passions,
  } = route.params;
  const { user } = useAuth();
  const [imageUri, setImageUri] = useState(imageUri);
  const [progress, setProgress] = useState(0);
  //Pass null if the user doesn't choose an image
  const [imageData, setImageData] = useState(null);
  const scrollRef = useRef();

  const navigate = () => {
    navigation.navigate(routes.REGISTERLOCATION, {
      username,
      pronoun,
      showPronoun,
      orientation,
      showOrientation,
      passions,
      imageData,
      imageUri,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow style={{ marginTop: 50 }} onPress={navigate} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (imageData) {
      navigate();
    }
  }, [imageData]);

  const handleImage = (uri) => {
    setImageUri(uri);
  };

  const uploadImage = async () => {
    if (imageUri) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (err) {
          console.log(err);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", imageUri, true);
        xhr.send(null);
      });

      const fileExtension = imageUri.substring(imageUri.lastIndexOf("/") + 1);
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
          let uploadProgress = snapshot.bytesTransferred / snapshot.totalBytes;
          setProgress(uploadProgress);
        },
        function (error) {
          console.log(`Error uploading photo: ${error}`);
        },
        function complete() {
          console.log("Upload is completed");
          setProgress(0);
          blob.close();

          storageRef.getDownloadURL().then(function (url) {
            setImageData(url);
          });
        }
      );
    }
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ flex: screen.height > 800 ? 1 : 0 }}
        ref={scrollRef}
      >
        <FormScreen
          isActive={imageUri}
          onPress={uploadImage}
          pagination={require("../../assets/pagination/6.png")}
          style={{
            paddingTop: Platform.OS === "ios" ? 45 : 0,
            paddingBottom: screen.height > 800 ? 0 : 70,
            paddingHorizontal: screen.width > 400 ? 20 : 17,
          }}
        >
          <H2 style={{ alignSelf: "center", paddingBottom: 40 }}>Add photo</H2>
          <PhotoCard
            imageUri={imageUri}
            onChangeImage={handleImage}
            name={username}
            pronoun={pronoun}
            orientation={orientation}
            showOrientation={showOrientation}
            showPronoun={showPronoun}
          />

          {progress > 0 ? (
            <ProgressBar
              color={colors.primary}
              progress={progress}
              width={200}
              style={{ alignSelf: "center", marginBottom: 20 }}
            />
          ) : (
            <View style={{ height: 26 }}></View>
          )}
        </FormScreen>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default PhotoScreen;
