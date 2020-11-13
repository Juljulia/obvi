import React from "react";
import { Image, View, StyleSheet } from "react-native";

import colors from "../../config/colors";
import H2 from "../typography/H2";
import Text from "../typography/Text";
import ImagePicker from "./ImagePicker";
import { screen } from "../../config/dimensions";

function PhotoCard({
  name,
  pronoun,
  orientation,
  imageUri,
  onChangeImage,
  showPronoun,
  showOrientation,
}) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/not-checked-in.png")}
        style={styles.dot}
      />
      <ImagePicker imageUri={imageUri} onChangeImage={onChangeImage} />
      <H2 style={{ paddingTop: 32 }}>{name}</H2>
      {showPronoun && <Text>{pronoun}</Text>}
      {showOrientation && <Text>{orientation}</Text>}
      <View style={{ alignItems: "flex-start", paddingTop: 8 }}>
        <View style={styles.info}>
          <Image
            source={require("../../assets/pin.png")}
            style={styles.pin}
          ></Image>
          <Text style={{ lineHeight: 25 }}>0 kilometers away</Text>
        </View>
        <View style={styles.info}>
          <Image
            source={require("../../assets/not-checked-in.png")}
            style={{ width: 32, height: 32 }}
          ></Image>
          <Text style={{ lineHeight: 25, color: colors.night }}>
            Not checked in
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.basicGrey,
    borderRadius: 30,
    height: 400,
    width: screen.width * 0.82,
    marginBottom: 32,
    paddingTop: 50,
    paddingHorizontal: 20,
    shadowColor: "#88A0B7",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  dot: {
    height: 48,
    position: "absolute",
    right: 16,
    top: 16,
    width: 48,
  },
  info: {
    alignItems: "center",
    flexDirection: "row",
  },
  pin: {
    marginHorizontal: 12,
    resizeMode: "contain",
    width: 10,
  },
});

export default PhotoCard;
