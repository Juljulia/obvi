import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";

import Text from "../components/Text";
import Screen from "../components/Screen";
import usersApi from "../api/users";

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
