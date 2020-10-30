import React from "react";
import { Image, View, StyleSheet } from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";

function Card({ children, image, title, subTitle, ...otherProps }) {
  return (
    <View style={styles.container} {...otherProps}>
      {children}
      <Image source={image}></Image>
      <View style={styles.description}>
        <Text>{title}</Text>
        <Text>{subTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    backgroundColor: colors.white,
    // borderColor: colors.primary,
    // borderWidth: 1,
    margin: 12,
    height: 390,
    width: 314,
    overflow: "hidden",
  },
  description: {
    position: "absolute",
    bottom: 24,
    paddingLeft: 24,
  },
});

export default Card;
