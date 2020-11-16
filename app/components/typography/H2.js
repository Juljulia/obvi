import React from "react";
import { StyleSheet } from "react-native";

import colors from "../../config/colors";
import Text from "./Text";

function H2({ children, style }) {
  return <Text style={[styles.container, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: colors.night,
  },
});

export default H2;
