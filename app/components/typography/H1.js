import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../config/colors";

import Text from "./Text";

function H1({ children }) {
  return <Text style={styles.container}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    color: colors.night,
  },
});

export default H1;
