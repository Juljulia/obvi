import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "./Text";

function CustomSliderMarker({ text }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/slider-icon.png")}
      />
      <Text style={styles.text}>{text}h</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "flex-start",
  },
  text: {
    position: "absolute",
    left: 27,
    top: 20,
  },
});

export default CustomSliderMarker;
