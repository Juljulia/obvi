import React from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";

function ProfileImage({
  imageUrl,
  imgWidth = 120,
  imgHeight = 120,
  imgBorderRadius = 75,
  bgWidth = 150,
  bgHeight = 150,
  style,
}) {
  return (
    <View style={style}>
      <ImageBackground
        style={[
          styles.imageBg,
          {
            width: bgWidth,
            height: bgHeight,
          },
        ]}
        source={require("../assets/profile-img-bg.png")}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={[
              styles.image,
              {
                width: imgWidth,
                height: imgHeight,
                borderRadius: imgBorderRadius,
              },
            ]}
          />
        ) : (
          <Image
            source={require("../assets/default.png")}
            style={[
              styles.image,
              {
                width: imgWidth,
                height: imgHeight,
                borderRadius: imgBorderRadius,
              },
            ]}
          />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileImage;
