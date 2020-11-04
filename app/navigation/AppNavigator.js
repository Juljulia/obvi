import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountScreen from "../screens/AccountScreen";
import CheckInScreen from "../screens/CheckInScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.white,
          borderRadius: 50,
          height: 74,
          shadowColor: "#BEC2E2",
          shadowOffset: {
            width: 6,
            height: 6,
          },
          shadowOpacity: 0.8,
          shadowRadius: 18,
          position: "absolute",
          left: 11,
          right: 11,
          bottom: 17,
        },
      }}
    >
      <Tab.Screen
        name="Check-in"
        component={CheckInScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../assets/icons/profile.png")} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image source={require("../assets/icons/home.png")} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
