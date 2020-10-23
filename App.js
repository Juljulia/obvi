import { useEffect, useState } from "react";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";

import "./firebase";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { navigationRef } from "./app/navigation/rootNavigation";
import RegisterNavigator from "./app/navigation/RegisterNavigator";
import usersApi from "./app/api/users";

export default function App() {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const getUserData = async () => {
    const data = await usersApi.getUser(user.uid);
    setUserData(data);
  };

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  if (user && !userData) {
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
          <RegisterNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
