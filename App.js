import { useEffect, useState } from "react";
import React from "react";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import "firebase/firestore";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import "./firebase";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { navigationRef } from "./app/navigation/rootNavigation";
import RegisterNavigator from "./app/navigation/RegisterNavigator";
import { ActivityIndicator } from "react-native";
import Screen from "./app/components/Screen";

export default function App() {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const db = firebase.firestore();
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    }
  });

  const getUserData = () => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .onSnapshot(function (doc) {
          if (doc.exists) {
            let data = doc.data();
            setUserData(data);
          } else {
            setUserData("");
          }
        });
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else if (user && userData === null) {
    return (
      <Screen>
        <ActivityIndicator size="large" />
      </Screen>
    );
  } else if (user && userData === "") {
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
          <RegisterNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  } else {
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
          {user && userData !== null ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}
