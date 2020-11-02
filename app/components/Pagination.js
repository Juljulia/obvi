import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "./typography/Text";

function Pagination({ page, totalPages }) {
  return (
    <View style={styles.container}>
      <Text>
        {page} / {totalPages}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Pagination;
