import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../config/colors";

import Text from "./Text";

function Subheading({ children }) {
  return <Text style={styles.container}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: colors.night,
    lineHeight: 20,
  },
});

export default Subheading;