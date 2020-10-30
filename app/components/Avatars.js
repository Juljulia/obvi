import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";

function Avatars(props) {
  return (
    <ScrollView style={styles.friendsContainer} horizontal={true}>
      <Image
        source={require("../assets/avatars/Button.png")}
        style={styles.avatar}
      ></Image>
      <Image
        source={require("../assets/avatars/1.png")}
        style={styles.avatar}
      ></Image>
      <Image
        source={require("../assets/avatars/2.png")}
        style={styles.avatar}
      ></Image>
      <Image
        source={require("../assets/avatars/3.png")}
        style={styles.avatar}
      ></Image>
      <Image
        source={require("../assets/avatars/4.png")}
        style={styles.avatar}
      ></Image>
      <Image
        source={require("../assets/avatars/5.png")}
        style={styles.avatar}
      ></Image>
      <Image
        source={require("../assets/avatars/6.png")}
        style={styles.avatar}
      ></Image>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 78,
    height: 78,
    marginRight: 16,
  },
  friendsContainer: {
    paddingTop: 32,
    paddingBottom: 40,
  },
  container: {},
});

export default Avatars;
