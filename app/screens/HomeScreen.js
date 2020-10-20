import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

import Button from "../components/Button";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import useLocation from "../hooks/useLocation";
import Map from "../components/Map";

function HomeScreen(props) {
  const { user, logOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const location = useLocation();
  const [region, setRegion] = useState();
  const deltas = {
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const getUserData = async () => {
    const data = await usersApi.getUser(user.uid);
    setUserData(data);
    setIsLoading(false);
  };

  // useEffect(() => {
  //   if (location) {
  //     setRegion({
  //       ...location,
  //       ...deltas,
  //     });
  //   }
  // }, [location]);

  useEffect(() => {
    if (location) {
      setRegion({
        ...location,
        ...deltas,
      });
    }

    getUserData();
  }, [location]);

  console.log(region);
  console.log(location);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.welcome}>
          <Text>Welcome {userData["username"]}</Text>
          <Button title="Logout" onPress={() => logOut()} />
        </View>
      )}

      {region && <Map style={styles.map} region={region}></Map>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },
});

export default HomeScreen;
