import React from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";

function MapMarker({
  imageUrl,
  imgWidth = 40,
  imgHeight = 40,
  imgBorderRadius = 20,
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
        source={require("../assets/map-marker.png")}
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

export default MapMarker;
