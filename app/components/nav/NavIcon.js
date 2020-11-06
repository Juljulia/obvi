import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../config/colors";

function navIcon({ icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={{ height: 20 }} resizeMode="contain" source={icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 62,
    height: 62,
    borderRadius: 31,
    shadowOffset: { width: 3.7, height: 3.7 },
    shadowColor: "#BECDE2",
    shadowRadius: 9,
    shadowOpacity: 1,
    backgroundColor: colors.basicGrey,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default navIcon;
