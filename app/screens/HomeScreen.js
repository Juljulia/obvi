import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

import useAuth from "../auth/useAuth";
import Button from "../components/Button";
import usersApi from "../api/users";

function HomeScreen(props) {
  const { user, logOut } = useAuth();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const data = await usersApi.getUser(user.uid);
    setUserData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>Welcome {userData["username"]}</Text>
          <Button title="Logout" onPress={() => logOut()} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
