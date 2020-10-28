import React from "react";
import { StyleSheet } from "react-native";

import Button from "../Button";
import Pagination from "../Pagination";
import Screen from "../Screen";
import Text from "../Text";

function FormScreen({ title, onPress, page, totalPages, children }) {
  return (
    <Screen style={styles.container}>
      <Text>{title}</Text>
      {children}
      <Button title="Continue" onPress={onPress} />
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
