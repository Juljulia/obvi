import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import colors from "../config/colors";

function NavArrow({ goBack = false, onPress }) {
  if (goBack) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.arrow(goBack)}
          source={require("../assets/arrow.png")}
        />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.arrow(goBack)}
        source={require("../assets/arrow.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowOffset: { width: 6, height: 6 },
    shadowColor: "rgba(190, 205, 226, 0.5)",
    shadowRadius: 16,
    shadowOpacity: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: (goBack) => ({
    transform: goBack ? [{ rotate: "180deg" }] : [],
  }),
});

export default NavArrow;
