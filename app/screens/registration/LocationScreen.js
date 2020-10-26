import React from "react";
import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as firebase from "firebase";
import "firebase/firestore";

import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Text from "../../components/Text";
import useAuth from "../../auth/useAuth";

function LocationScreen({ route }) {
  const { orientation, passions, pronoun, username, imageData } = route.params;
  const { user } = useAuth();
  const db = firebase.firestore();

  const userInfo = {
    orientation,
    passions,
    pronoun,
    username,
    imageData,
    email: user.email,
    uid: user.uid,
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
    } catch (error) {
      console.log(error);
    }

    addUserInfo();
  };

  const addUserInfo = () => {
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
    <View style={styles.container}>
      <Text>Enable Location</Text>
      <Button title="Allow location" onPress={getLocation} />
      <Pagination page="7" totalPages="7" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default LocationScreen;
