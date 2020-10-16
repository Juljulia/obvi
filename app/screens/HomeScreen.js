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
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from "./../config/mapStyle";

function HomeScreen(props) {
  const { user, logOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [locationList, setLocationList] = useState();

  const getUserData = async () => {
    const data = await usersApi.getUser(user.uid);
    setUserData(data);
    setIsLoading(false);
  };

  const getLocationList = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    const json = await response.json();
    setLocationList(json);
  };

  useEffect(() => {
    getUserData();
    getLocationList();

    console.log(locationList);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>Welcome {userData["username"]}</Text>
          <Button title="Logout" onPress={() => logOut()} />
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 57.70547,
              longitude: 11.968415,
              latitudeDelta: 0.015, //avgör hur inzoomat det ska vara från början
              longitudeDelta: 0.0121,
            }}
            customMapStyle={mapStyle}
          ></MapView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default HomeScreen;
