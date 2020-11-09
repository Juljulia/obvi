import React from "react";
import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";

import Button from "../Button";
import Screen from "../Screen";
import H1 from "../typography/H1";

const screenWidth = Dimensions.get("window").width;

function FormScreen({
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
          <Button title="Continue" onPress={onPress} />
        ) : (
          <Button disabled={true} disabledStyle title="Continue" />
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
    paddingHorizontal: screenWidth > 400 ? 38 : 17,
  },
});

export default FormScreen;
