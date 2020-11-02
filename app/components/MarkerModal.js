import React, { useEffect, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import Button from "../components/Button";
import Text from "../components/typography/Text";
import colors from "../config/colors";
import ProfileImage from "./ProfileImage";
import H2 from "./typography/H2";
import Subheading from "./typography/Subheading";

const value = new Animated.Value(0);

const saveModalTranslationY = value.interpolate({
  inputRange: [0, 1],
  outputRange: [600, 0],
});

function MarkerModal({
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
              <H2 style={styles.h2}>{username}</H2>
              <Text style={{ lineHeight: 20 }}>{pronoun}</Text>
              <Text style={{ lineHeight: 20 }}>{orientation}</Text>
              <Text style={{ lineHeight: 20 }}>3 kilometers away</Text>
            </View>
            <View style={styles.checkinInfo}>
              <View style={styles.checkedIn}>
                <Subheading>Now checked in</Subheading>
                <Image source={require("../assets/checked-in.png")} />
              </View>
              <Text style={{ textDecorationLine: "underline" }}>{name}</Text>
            </View>
          </View>
          <Button title="Visit Profile" />
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
    maxHeight: "70%",
  },
  closeButton: {
    backgroundColor: colors.mediumGrey,
    height: 5,
    width: 35,
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
    backgroundColor: colors.basicGrey,
    paddingHorizontal: 22,
    paddingTop: 50,
    marginBottom: 132,
    borderTopRightRadius: 30,
    shadowColor: "#88A0B7",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    alignItems: "center",
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
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 41,
  },
  checkinInfo: {
    marginTop: 22,
  },
  checkedIn: {
    flexDirection: "row",
    alignItems: "center",
  },
  h2: {
    marginBottom: 8,
  },
});

export default MarkerModal;
