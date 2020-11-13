import React, { useLayoutEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import * as firebase from "firebase";
import "firebase/firestore";

import Button from "../../components/Button";
import NavArrow from "../../components/nav/NavArrow";
import InfoModal from "../../components/registration/InfoModal";
import Screen from "../../components/Screen";
import Text from "../../components/typography/Text";
import H2 from "../../components/typography/H2";
import useAuth from "../../auth/useAuth";
import UploadScreen from "../UploadScreen";

function LocationScreen({ navigation, route }) {
  const {
    orientation,
    showOrientation,
    passions,
    pronoun,
    showPronoun,
    username,
    imageData,
    imageUri,
  } = route.params;
  const [infoVisible, setInfoVisible] = useState(false);
  const { user } = useAuth();
  const db = firebase.firestore();
  const [uploadVisible, setUploadVisible] = useState(false);

  const userInfo = {
    orientation,
    showOrientation,
    passions,
    pronoun,
    showPronoun,
    username,
    imageData,
    email: user.email,
    uid: user.uid,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavArrow
          style={{ marginTop: 50 }}
          onPress={() => setUploadVisible(true)}
        />
      ),
    });
  }, [navigation]);

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
    } catch (error) {
      console.log(error);
    }

    setUploadVisible(true);
  };

  const addUserInfo = async () => {
    db.collection("users")
      .doc(user.uid)
      .set(userInfo)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Screen>
      <UploadScreen onDone={addUserInfo} visible={uploadVisible} />
      <ImageBackground
        source={require("../../assets/location-background.png")}
        style={styles.imageBackground}
      />
      <View style={styles.container}>
        <H2>Enable Location</H2>
        <ImageBackground
          source={require("../../assets/map-marker.png")}
          style={styles.mapMarker}
        >
          {imageData ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 65, height: 65, borderRadius: 75 }}
            />
          ) : (
            <Image
              source={require("../../assets/default.png")}
              style={{
                width: 62,
                height: 62,
              }}
            />
          )}
        </ImageBackground>
        <View style={{ alignItems: "center" }}>
          <Button
            title="Allow location"
            onPress={getLocation}
            style={{ width: 280 }}
          />
          <TouchableOpacity
            onPress={() => setInfoVisible(true)}
            style={styles.moreInfo}
          >
            <Text style={{ paddingRight: 8 }}>Tell me more</Text>
            <Image source={require("../../assets/arrow-down.png")}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require("../../assets/pagination/7.png")}
        style={styles.pagination}
      ></Image>
      <InfoModal
        onPress={() => setInfoVisible(false)}
        onPressButton={getLocation}
        visible={infoVisible}
      ></InfoModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 120,
  },
  imageBackground: {
    position: "absolute",
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  mapMarker: {
    justifyContent: "center",
    alignItems: "center",
    width: 220,
    height: 220,
  },
  moreInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 16,
  },
  pagination: {
    alignSelf: "center",
    bottom: -32,
    position: "absolute",
  },
});

export default LocationScreen;
