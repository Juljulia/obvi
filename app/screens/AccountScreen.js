import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";

import Text from "../components/typography/Text";
import NavArrow from "../components/nav/NavArrow";
import Screen from "../components/Screen";
import usersApi from "../api/users";
import ScreenTitle from "../components/ScreenTitle";

function AccountScreen({ navigation }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const userAuthData = await usersApi.getUser(user.uid);
    setUserData(userAuthData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Screen>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <NavArrow goBack={true}></NavArrow>
      </TouchableOpacity>
      <ScreenTitle>My Profile</ScreenTitle>
      <View style={styles.container}>
        {userData.imageData ? (
          <Image
            source={{ uri: userData.imageData }}
            style={styles.image}
          ></Image>
        ) : (
          <Image
            source={require("../assets/default.png")}
            style={styles.image}
          ></Image>
        )}
        <Text style={styles.text}>{userData.username}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 70,
  },
  text: {
    marginTop: 15,
  },
});

export default AccountScreen;
