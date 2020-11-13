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
      style={[styles.button, { backgroundColor: colors[color] }, style]}
      onPress={onPress}
      {...otherProps}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
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
    shadowColor: colors.shadow,
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
    lineHeight: 24,
    color: colors.white,
  },
});

export default AppButton;
