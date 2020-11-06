import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import colors from "../../config/colors";

import Button from "../Button";
import Screen from "../Screen";
import H1 from "../typography/H1";

function FormScreen({
  isActive = false,
  title,
  onPress,
  children,
  style,
  pagination,
}) {
  return (
    <Screen style={[styles.container, style]}>
      <View>
        <H1>{title}</H1>
        {children}
        {isActive ? (
          <Button title="Continue" onPress={onPress} />
        ) : (
          <Button disabled={true} disabledStyle title="Continue" />
        )}
      </View>
      <Image
        source={pagination}
        style={{ alignSelf: "center", position: "absolute", bottom: -32 }}
      ></Image>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 100 : 50,
    paddingHorizontal: Platform.OS === "ios" ? 30 : 15,
  },
});

export default FormScreen;
