import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import useAuth from "../auth/useAuth";
import Button from "../components/Button";
import usersApi from "../api/users";

function HomeScreen(props) {
  const { user, logOut } = useAuth();
  const [userData, setUserData] = useState();

  const getData = async () => {
    const data = await usersApi.getUser(user.uid);
    setUserData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!userData) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome {userData["username"]}</Text>
      <Button title="Logout" onPress={() => logOut()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
