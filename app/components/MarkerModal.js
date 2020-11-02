import React, { useEffect, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import Text from "../components/typography/Text";
import colors from "../config/colors";
import usersApi from "../api/users";
import ProfileImage from "./ProfileImage";
import H1 from "./typography/H1";

const value = new Animated.Value(0);

const saveModalTranslationY = value.interpolate({
  inputRange: [0, 1],
  outputRange: [600, 0],
});

function MarkerModal({
  adress,
  visible,
  name,
  orientation,
  username,
  pronoun,
  imageData,
}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(visible);
    Animated.timing(value, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (showModal) {
    return (
      <View style={styles.container}>
        <Animated.View style={styles.innerContainer}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={styles.closeButton} />
          </TouchableWithoutFeedback>
          <ProfileImage
            style={styles.profileImg}
            imageUrl={imageData}
            imgWidth={59}
            imgHeight={59}
            imgBorderRadius={29.5}
            bgWidth={72}
            bgHeight={72}
          />
          <View style={styles.info}>
            <View style={styles.userInfo}>
              <Text>{username}</Text>
              <Text>{pronoun}</Text>
              <Text>{orientation}</Text>
            </View>
            <View style={styles.checkinInfo}>
              <Text>Now checked in</Text>
              <Text>{name}</Text>
              {/* {adress ? <Text>{adress}</Text> : <Text>No adress</Text>} */}
            </View>
          </View>
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
    backgroundColor: colors.mediumGrey,
    height: 5,
    width: 35,
    borderRadius: 5,
    position: "absolute",
    top: 15,
    left: "45%",
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
    backgroundColor: colors.basicGrey,
    paddingTop: 50,
  },
  profileImg: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -60,
    left: 0,
    backgroundColor: colors.basicGrey,
    width: 116,
    height: 116,
    borderRadius: 58,
  },
  info: {
    flexDirection: "row",
  },
});

export default MarkerModal;
