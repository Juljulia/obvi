import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../config/colors";

import Button from "../Button";
import Pagination from "../Pagination";
import Screen from "../Screen";
import Text from "../typography/Text";

function FormScreen({
  color,
  isActive = false,
  title,
  onPress,
  page,
  totalPages,
  textColor,
  children,
}) {
  return (
    <Screen style={styles.container}>
      <Text>{title}</Text>
      {children}
      {isActive ? (
        <Button title="Continue" onPress={onPress} />
      ) : (
        <Button disabled={true} disabledStyle title="Continue" />
      )}
      {/* <Button
        title="Continue"
        onPress={onPress}
        color={color}
        textColor={textColor}
      /> */}
      <Pagination page={page} totalPages={totalPages} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 160,
  },
});

export default FormScreen;
