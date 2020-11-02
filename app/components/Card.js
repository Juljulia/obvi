import React from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";

function Card({ children, image, title, subTitle, onPress, ...otherProps }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container} {...otherProps}>
        {children}
        <Image source={image}></Image>
        <View style={styles.description}>
          <Text>{title}</Text>
          <Text>{subTitle}</Text>
        </View>
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
    height: 390,
    width: 314,
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
  description: {
    position: "absolute",
    bottom: 24,
    paddingLeft: 24,
  },
});

export default Card;
