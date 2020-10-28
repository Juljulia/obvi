import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
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
        <ListItem
          title={userData.username}
          subTitle={userData.pronoun}
          image={userData.imageData}
        ></ListItem>
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
