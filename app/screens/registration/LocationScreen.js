import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import * as firebase from "firebase";
import "firebase/firestore";

import Button from "../../components/Button";
import NavArrow from "../../components/nav/NavArrow";
import InfoModal from "../../components/registration/InfoModal";
import Pagination from "../../components/Pagination";
import Screen from "../../components/Screen";
import Text from "../../components/typography/Text";
import useAuth from "../../auth/useAuth";

function LocationScreen({ navigation, route }) {
  const {
    orientation,
    showOrientation,
    passions,
    pronoun,
    showPronoun,
    username,
    imageData,
  } = route.params;
  const [infoVisible, setInfoVisible] = useState(false);
  const { user } = useAuth();
  const db = firebase.firestore();

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
      headerRight: () => <NavArrow onPress={addUserInfo} />,
    });
  }, [navigation]);

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
    } catch (error) {
      console.log(error);
    }

    addUserInfo();
  };

  console.log(userInfo);

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
    <Screen style={styles.container}>
      <Text>Enable Location</Text>
      <Button title="Allow location" onPress={getLocation} />
      <TouchableOpacity onPress={() => setInfoVisible(true)}>
        <Text>Tell me more</Text>
      </TouchableOpacity>
      <Pagination page="7" totalPages="7" />
      <InfoModal
        onPress={() => setInfoVisible(false)}
        onPressButton={getLocation}
        visible={infoVisible}
      ></InfoModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 160 },
});

export default LocationScreen;
