import React from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";

import colors from "../config/colors";

function NavArrow({ goBack = false, onPress }) {
  if (goBack) {
    return (
      <View style={[styles.container]}>
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
    shadowOffset: { width: 7, height: 7 },
    shadowColor: colors.shadow,
    shadowRadius: 10,
    shadowOpacity: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginHorizontal: 30,
  },
  arrow: (goBack) => ({
    transform: goBack ? [{ rotate: "180deg" }] : [],
  }),
});

export default NavArrow;
