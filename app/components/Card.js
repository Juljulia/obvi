import React from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import Text from "../components/typography/Text";
import colors from "../config/colors";
import H2 from "./typography/H2";

function Card({ children, image, title, subTitle, onPress, ...otherProps }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container} {...otherProps}>
        <View style={styles.textContent}>
          <H2>{title}</H2>
          <Text>{subTitle}</Text>
        </View>
        <Image source={image}></Image>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    backgroundColor: colors.white,
    // borderColor: colors.primary,
    // borderWidth: 1,
    marginBottom: 24,
    width: 256,
    overflow: "hidden",
    shadowColor: "#879fb7",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textContent: {
    marginHorizontal: 17,
    marginVertical: 8,
  },
});

export default Card;
