import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountScreen from "../screens/AccountScreen";
import MapScreen from "../screens/MapScreen";
import colors from "../config/colors";
import MenuNavigator from "./MenuNavigator";
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      mode="modal"
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.white,
          borderRadius: 35,
          height: 84,
          shadowColor: "#BEC2E2",
          shadowOffset: {
            width: 6,
            height: 6,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
          position: "absolute",
          left: 11,
          right: 11,
          bottom: 17,
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 50 }}
              resizeMode="contain"
              source={require("../assets/icons/menu.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 25 }}
              resizeMode="contain"
              source={require("../assets/icons/search.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 25 }}
              resizeMode="contain"
              source={require("../assets/icons/profile.png")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => (
            <Image
              style={{ width: 24 }}
              resizeMode="contain"
              source={require("../assets/icons/home.png")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
