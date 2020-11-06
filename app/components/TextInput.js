import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// import defaultStyles from "../config/styles";
import colors from "../config/colors";

function AppTextInput({ icon, width = "100%", style, ...otherProps }) {
  return (
    <View style={[styles.container, { width }, style]}>
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
        style={styles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginTop: 34,
    marginBottom: 24,
    backgroundColor: "transparent",
    borderColor: colors.white,
    borderWidth: 0.5,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    shadowColor: colors.mediumGrey,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: { width: -5, height: 10 },
    borderRadius: 30,
    elevation: 1,
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
