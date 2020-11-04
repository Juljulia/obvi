import React from "react";
import { StyleSheet } from "react-native";

import H2 from "./typography/H2";

function ScreenTitle({ children }) {
  return <H2 style={styles.text}>{children}</H2>;
}

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    top: 10,
    width: "100%",
    textAlign: "center",
  },
});

export default ScreenTitle;
