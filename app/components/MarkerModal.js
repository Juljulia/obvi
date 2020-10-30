import React, { useEffect, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import Text from "../components/Text";
import colors from "../config/colors";
import usersApi from "../api/users";

const value = new Animated.Value(0);

const saveModalTranslationY = value.interpolate({
  inputRange: [0, 1],
  outputRange: [600, 0],
});

function MarkerModal({ adress, visible, name, orientation, username }) {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const { user } = useAuth();

  const getUserData = async () => {
    const userAuthData = await usersApi.getUser(user.uid);
    setUserData(userAuthData);
  };

  useEffect(() => {
    setShowModal(visible);
    Animated.timing(value, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  useEffect(() => {
    getUserData();
  }, []);

  if (showModal) {
    return (
      <View style={styles.container}>
        <Animated.View style={styles.innerContainer}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={styles.closeButton} />
          </TouchableWithoutFeedback>
          <View style={styles.imageBg}>
            {userData.imageData ? (
              <Image
                source={{ uri: userData.imageData }}
                style={styles.image}
              />
            ) : (
              <Image
                source={require("../assets/default.png")}
                style={styles.image}
              />
            )}
          </View>
          <Text>{name}</Text>
          <Text>{username}</Text>
          {adress ? <Text>{adress}</Text> : <Text>No adress</Text>}
          <Text>{orientation}</Text>
        </Animated.View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: "70%",
  },
  closeButton: {
    backgroundColor: colors.medium,
    height: 8,
    width: 50,
    borderRadius: 5,
    position: "absolute",
    top: 15,
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageBg: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -60,
    left: 0,
    width: 145,
    height: 145,
    borderRadius: 70,
    backgroundColor: colors.primary,
  },
});

export default MarkerModal;
