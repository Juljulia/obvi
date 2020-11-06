import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "87%",
    alignSelf: "flex-end",
    height: 1,
    backgroundColor: colors.mediumGrey,
  },
});

export default ListItemSeparator;
