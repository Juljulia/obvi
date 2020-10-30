import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as firebase from "firebase";

import Map from "../components/Map";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";

const deltas = {
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

function MapScreen({ route }) {
  const [checkIns, setCheckIns] = useState([]);
  const [region, setRegion] = useState();
  const db = firebase.firestore();
  const location = useLocation();

  const getCheckIns = async () => {
    let places = [];
    await db
      .collection("checkIns")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          places.push(doc.data());
        });
      });
    setCheckIns(places);
  };

  useEffect(() => {
    if (location) {
      setRegion({
        ...location,
        ...deltas,
      });
    }
    getCheckIns();
  }, [location]);

  useEffect(() => {
    if (route.params?.update) {
      getCheckIns();
      route.params.update = false;
    }
  }, [route.params?.update]);

  return (
    <Screen style={styles.container}>
      <View style={styles.container}>
        <Map style={styles.map} region={region} pins={checkIns}></Map>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default MapScreen;
