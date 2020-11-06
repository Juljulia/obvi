import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import colors from "../../config/colors";
import Text from "../typography/Text";
import useAuth from "../../auth/useAuth";
import routes from "../../navigation/routes";

const menuItems = [
  {
    title: "Home",
    icon: { name: require("../../assets/icons/home.png"), width: 17 },
    targetScreen: routes.HOME,
  },
  {
    title: "Discover people",
    icon: { name: require("../../assets/icons/compas.png"), width: 18 },
    targetScreen: routes.MAP,
  },
  {
    title: "Check in",
    icon: { name: require("../../assets/icons/location.png"), width: 14 },
    targetScreen: routes.CHECKIN,
  },
  {
    title: "Calender",
    icon: { name: require("../../assets/icons/calender.png"), width: 16 },
  },
  {
    title: "Messages",
    icon: { name: require("../../assets/icons/chat.png"), width: 19 },
  },
  {
    title: "Profile",
    icon: { name: require("../../assets/icons/profile.png"), width: 18 },
    targetScreen: routes.ACCOUNT,
  },
  {
    title: "Settings",
    icon: { name: require("../../assets/icons/settings.png"), width: 19 },
  },
  {
    title: "About Obvi",
    icon: { name: require("../../assets/icons/logo.png"), width: 19 },
  },
  {
    title: "Supporters",
    icon: { name: require("../../assets/icons/supporters.png"), width: 16 },
  },
  {
    title: "Sponsors",
    icon: { name: require("../../assets/icons/sponsors.png"), width: 22 },
  },
];

function ModalMenu({ navigation }) {
  const { logOut } = useAuth();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View onl style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 15,
          height: 20,
          width: "100%",
          alignItems: "center",
        }}
        onPress={handlePress}
      >
        <View style={styles.closeButton} />
      </TouchableOpacity>
      <View style={styles.linksContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                item.targetScreen ? navigation.navigate(item.targetScreen) : ""
              }
              style={styles.link}
            >
              <Image
                style={{ width: item.icon.width }}
                resizeMode="contain"
                source={item.icon.name}
              />
              <Text style={{ marginLeft: 15 }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={{ width: "100%" }} onPress={() => logOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.basicGrey,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 40,
    height: "90%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    width: "100%",
    position: "absolute",
    bottom: 0,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    alignItems: "center",
    zIndex: 10000,
  },
  closeButton: {
    backgroundColor: colors.mediumGrey,
    height: 5,
    width: 35,
    borderRadius: 5,
  },
  linksContainer: {
    justifyContent: "space-evenly",
    height: "70%",
    marginVertical: 30,
    width: "100%",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
    marginBottom: 30,
  },
});

export default ModalMenu;
