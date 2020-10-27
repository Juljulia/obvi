import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import RulesScreen from "../screens/registration/RulesScreen";
import NameScreen from "../screens/registration/NameScreen";
import PronounScreen from "../screens/registration/PronounScreen";
import OrientationScreen from "../screens/registration/OrientationScreen";
import PassionsScreen from "../screens/registration/PassionsScreen";
import PhotoScreen from "../screens/registration/PhotoScreen";
import LocationScreen from "../screens/registration/LocationScreen";
import navigation from "../navigation/rootNavigation";
import routes from "../navigation/routes";
import NavArrow from "../components/NavArrow";

const Stack = createStackNavigator();

const RegisterNavigator = () => {
  const headerOptions = {
    title: "Registration",
    headerBackTitleVisible: false,
    // headerRight: () => <NavArrow />,
    // headerLeft: () => <NavArrow goBack={true} />,
    headerBackImage: () => <NavArrow goBack={true} />,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register Rules"
        component={RulesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register Name"
        component={NameScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name="Register Pronoun"
        component={PronounScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name="Register Orientation"
        component={OrientationScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name="Register Passions"
        component={PassionsScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name="Register Photo"
        component={PhotoScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name="Register Location"
        component={LocationScreen}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
};

export default RegisterNavigator;
