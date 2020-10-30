import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  disabledStyle = false,
  textColor = "white",
  ...otherProps
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        styles.disabledButton(disabledStyle),
      ]}
      onPress={onPress}
      {...otherProps}
    >
      <Text
        style={[
          styles.text,
          styles.disabledText(disabledStyle),
          { color: colors[textColor] },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  disabledButton: (disabledStyle) =>
    disabledStyle && {
      backgroundColor: colors.light,
      backgroundColor: "transparent",
      borderWidth: 1,
      overflow: "hidden",
      shadowColor: "#A0A5B9",
      shadowRadius: 10,
      shadowOpacity: 0.5,
      borderColor: "#FFFFFF",
      shadowOffset: { width: -20, height: 10 },
    },
  disabledText: (disabledStyle) =>
    disabledStyle && {
      color: colors.medium,
    },
});

export default AppButton;
