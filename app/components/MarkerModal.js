import React, { useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";

const value = new Animated.Value(0);

const saveModalTranslationY = value.interpolate({
  inputRange: [0, 1],
  outputRange: [600, 0],
});

function MarkerModal({ adress, modalVisible, name, orientation, username }) {
  useEffect(() => {
    Animated.timing(value, {
      toValue: modalVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.innerContainer}>
        <Text>{name}</Text>
        <Text>{username}</Text>
        {adress ? <Text>{adress}</Text> : <Text>No adress</Text>}
        <Text>{orientation}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: "50%",
  },
  innerContainer: {
    transform: [
      {
        translateY: saveModalTranslationY,
      },
    ],
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MarkerModal;
