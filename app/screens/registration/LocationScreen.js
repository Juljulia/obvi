import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as firebase from "firebase";
import "firebase/firestore";

import Button from "../../components/Button";
import NavArrow from "../../components/NavArrow";
import Pagination from "../../components/Pagination";
import Screen from "../../components/Screen";
import Text from "../../components/Text";
import useAuth from "../../auth/useAuth";

function LocationScreen({ navigation, route }) {
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
    <Screen style={styles.container}>
      <Text>Enable Location</Text>
      <Button title="Allow location" onPress={getLocation} />
      <Pagination page="7" totalPages="7" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 160 },
});

export default LocationScreen;
