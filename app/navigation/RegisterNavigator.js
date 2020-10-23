import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RulesScreen from "../screens/registration/RulesScreen";
import NameScreen from "../screens/registration/NameScreen";
import PronounScreen from "../screens/registration/PronounScreen";
import OrientationScreen from "../screens/registration/OrientationScreen";
import PassionsScreen from "../screens/registration/PassionsScreen";
import PhotoScreen from "../screens/registration/PhotoScreen";
import LocationScreen from "../screens/registration/LocationScreen";

const Stack = createStackNavigator();

const RegisterNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Register Rules"
      component={RulesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register Name"
      component={NameScreen}
      options={{ title: "Registration" }}
    />
    <Stack.Screen
      name="Register Pronoun"
      component={PronounScreen}
      options={{ title: "Registration" }}
    />
    <Stack.Screen
      name="Register Orientation"
      component={OrientationScreen}
      options={{ title: "Registration" }}
    />
    <Stack.Screen
      name="Register Passions"
      component={PassionsScreen}
      options={{ title: "Registration" }}
    />
    <Stack.Screen
      name="Register Photo"
      component={PhotoScreen}
      options={{ title: "Registration" }}
    />
    <Stack.Screen
      name="Register Location"
      component={LocationScreen}
      options={{ title: "Registration" }}
    />
  </Stack.Navigator>
);

export default RegisterNavigator;
