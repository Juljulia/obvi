import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import NavArrow from "../components/NavArrow";
import Map from "../components/Map";
import Screen from "../components/Screen";

function MapScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.container}>
        <Map style={styles.map}></Map>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrow}
        >
          <NavArrow goBack={true}></NavArrow>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrow: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default MapScreen;
