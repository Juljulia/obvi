import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";

import Text from "../components/Text";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import usersApi from "../api/users";
import ListItem from "../components/lists/ListItem";

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
      <View style={styles.container}>
        <Text>{userData.username}</Text>
        {userData.imageData && (
          <Image source={{ uri: userData.imageData }}></Image>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 70,
  },
});

export default AccountScreen;
