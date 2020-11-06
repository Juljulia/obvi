import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ModalMenu from "../components/nav/ModalMenu";
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
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MenuNavigator;
