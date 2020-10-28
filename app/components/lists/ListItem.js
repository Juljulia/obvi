import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({ title, subTitle, image }) {
  return (
    <View style={styles.container}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    padding: 15,
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 70,
  },
});

export default ListItem;
