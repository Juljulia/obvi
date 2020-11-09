import React from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";

import colors from "../../config/colors";

function NavArrow({ goBack = false, onPress, style }) {
  if (goBack) {
    return (
      <View style={[styles.container, style]}>
        <Image
          style={styles.arrow(goBack)}
          source={require("../../assets/arrow.png")}
        />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image
        style={styles.arrow(goBack)}
        source={require("../../assets/arrow.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowOffset: { width: 3.74, height: 3.74 },
    shadowColor: colors.shadow,
    shadowRadius: 4.5,
    shadowOpacity: 1,
    backgroundColor: colors.basicGrey,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginHorizontal: 30,
  },
  arrow: (goBack) => ({
    transform: goBack ? [{ rotate: "180deg" }] : [],
    width: 8,
    height: 12,
  }),
});

export default NavArrow;
