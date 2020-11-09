import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";

import RulesScreen from "../screens/registration/RulesScreen";
import NameScreen from "../screens/registration/NameScreen";
import PronounScreen from "../screens/registration/PronounScreen";
import OrientationScreen from "../screens/registration/OrientationScreen";
import PassionsScreen from "../screens/registration/PassionsScreen";
import PhotoScreen from "../screens/registration/PhotoScreen";
import LocationScreen from "../screens/registration/LocationScreen";
import NavArrow from "../components/nav/NavArrow";
import H2 from "../components/typography/H2";
import colors from "../config/colors";

const Stack = createStackNavigator();
const height = Dimensions.get("window").height;

const RegisterNavigator = () => {
  const headerOptions = {
    headerTitle: () => <H2>Registration</H2>,
    headerBackTitleVisible: false,
    headerBackImage: () => <NavArrow style={{ marginTop: 50 }} goBack={true} />,
    headerStyle: {
      height: height * 0.09,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
      backgroundColor: colors.basicGrey,
    },
  };

  const locationHeaderOptions = {
    ...headerOptions,
    headerTransparent: true,
    headerLeft: null,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register Rules"
        component={RulesScreen}
        options={headerOptions}
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
        options={locationHeaderOptions}
      />
    </Stack.Navigator>
  );
};

export default RegisterNavigator;
