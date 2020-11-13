import React from "react";
import { Image, ImageBackground, View, StyleSheet } from "react-native";

import colors from "../config/colors";
import H2 from "./typography/H2";
import Text from "./typography/Text";

function ProfileCard({
  name,
  pronoun,
  orientation,
  imageData,
  showPronoun,
  showOrientation,
  distance,
}) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/checked-in.png")} style={styles.dot} />
      <ImageBackground
        style={styles.imageBackground}
        source={require("../assets/profile-img-bg.png")}
      >
        {imageData ? (
          <Image
            source={{ uri: imageData }}
            style={{ width: 120, height: 120, borderRadius: 75 }}
          ></Image>
        ) : (
          <Image
            source={require("../assets/default.png")}
            style={{ width: 120, height: 120 }}
          ></Image>
        )}
      </ImageBackground>

      <H2 style={{ paddingTop: 32 }}>{name}</H2>
      {showPronoun && <Text>{pronoun}</Text>}
      {showOrientation && <Text>{orientation}</Text>}
      <View style={{ alignItems: "flex-start", paddingTop: 8 }}>
        {distance && (
          <View style={styles.info}>
            <Image
              source={require("../assets/pin.png")}
              style={styles.pin}
            ></Image>
            <Text style={{ lineHeight: 25 }}>{distance} kilometers away</Text>
          </View>
        )}
        <View style={styles.info}>
          <Image
            source={require("../assets/checked-in.png")}
            style={{ width: 32, height: 32 }}
          ></Image>
          <Text style={{ lineHeight: 25, color: colors.night }}>
            Now checked in
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
    marginBottom: 32,
    paddingTop: 50,
    shadowColor: "#88A0B7",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  imageBackground: {
    alignItems: "center",
    backgroundColor: colors.basicGrey,
    justifyContent: "center",
    overflow: "hidden",
    width: 150,
    height: 150,
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

export default ProfileCard;
