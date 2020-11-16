import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

import Button from "../Button";
import Screen from "../Screen";
import H1 from "../typography/H1";
import { screen } from "../../config/dimensions";

function FormScreen({
  buttonStyle,
  isActive = false,
  title,
  onPress,
  children,
  style,
  pagination,
  headingStyle,
}) {
  return (
    <Screen style={[styles.container, style]}>
      <View>
        <H1 style={headingStyle}>{title}</H1>
        {children}
        {isActive ? (
          <Button
            title="Continue"
            onPress={onPress}
            textStyle={{ fontSize: 19.6 }}
            style={buttonStyle}
          />
        ) : (
          <Image
            source={require("../../assets/disabled-button.png")}
            style={{
              alignSelf: "center",
              marginVertical: 10,
            }}
          ></Image>
        )}
      </View>
      <Image
        source={pagination}
        style={{ alignSelf: "center", position: "absolute", bottom: 0 }}
      ></Image>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 100 : 50,
    paddingHorizontal: screen.width > 400 ? 38 : 17,
  },
});

export default FormScreen;
