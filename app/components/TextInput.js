import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppTextInput({
  icon,
  width = 315,
  height = 70,
  style,
  inputStyle,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width, height }, style]}>
      {height < 100 ? (
        <Image
          style={{
            width,
            height,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          source={require("../assets/input-bg.png")}
          resizeMode="stretch"
        />
      ) : (
        <Image
          style={{
            width,
            height,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          source={require("../assets/message-bg.png")}
          resizeMode="stretch"
        />
      )}
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.mediumGrey}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.mediumGrey}
        style={[styles.text, inputStyle]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 34,
    marginBottom: 24,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    elevation: 1,
    borderRadius: Platform.OS === "ios" ? 30 : 0,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    padding: 5,
    alignSelf: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
