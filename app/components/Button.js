import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import Text from "../components/typography/Text";

function AppButton({
  title,
  onPress,
  color = "primary",
  disabledStyle = false,
  style,
  textStyle,
  ...otherProps
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        styles.disabledButton(disabledStyle),
        style,
      ]}
      onPress={onPress}
      {...otherProps}
    >
      <Text
        style={[styles.text, styles.disabledText(disabledStyle), textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: 180,
    height: 60,
    marginVertical: 10,
    shadowColor: "#8F93EA",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    alignSelf: "center",
    elevation: 4,
  },
  text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: colors.white,
  },
  disabledButton: (disabledStyle) =>
    disabledStyle && {
      backgroundColor: colors.light,
      backgroundColor: "transparent",
      borderWidth: 0.8,
      overflow: "hidden",
      shadowColor: "#BECDE2",
      shadowRadius: 10,
      shadowOpacity: 0.8,
      borderColor: "#d8e0ed",
      shadowOffset: { width: -20, height: 10 },
    },
  disabledText: (disabledStyle) =>
    disabledStyle && {
      color: colors.mediumGrey,
    },
});

export default AppButton;
