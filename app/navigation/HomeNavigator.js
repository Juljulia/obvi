import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import CheckInScreen from "../screens/CheckInScreen";
import VisitProfileScreen from "../screens/VisitProfileScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator mode="modal">
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
      name="Visit Profile"
      component={VisitProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
