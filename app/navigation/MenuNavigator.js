import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ModalMenu from "../components/nav/ModalMenu";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import CheckInScreen from "../screens/CheckInScreen";
import AccountScreen from "../screens/AccountScreen";

const Stack = createStackNavigator();

const MenuNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Menu"
      component={ModalMenu}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Check-in"
      component={CheckInScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MenuNavigator;
