import React from "react";
import { Platform, StyleSheet } from "react-native";
import colors from "../../config/colors";

import Button from "../Button";
import Pagination from "../Pagination";
import Screen from "../Screen";
import H1 from "../typography/H1";

function FormScreen({
  isActive = false,
  title,
  onPress,
  page,
  totalPages,
  children,
}) {
  return (
    <Screen style={styles.container}>
      <H1>{title}</H1>
      {children}
      {isActive ? (
        <Button title="Continue" onPress={onPress} />
      ) : (
        <Button disabled={true} disabledStyle title="Continue" />
      )}
      <Pagination page={page} totalPages={totalPages} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 150 : 60,
    paddingHorizontal: Platform.OS === "ios" ? 30 : 15,
    // borderWidth: 1,
    // borderColor: "red",
  },
});

export default FormScreen;
