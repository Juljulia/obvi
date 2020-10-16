import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

import Button from "../components/Button";
import getEnvVars from "../../environment";
import mapStyle from "./../config/mapStyle";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";

function HomeScreen(props) {
  const { user, logOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [locationList, setLocationList] = useState();
  const { googlePlacesApiKey } = getEnvVars();

  const getUserData = async () => {
    const data = await usersApi.getUser(user.uid);
    setUserData(data);
    setIsLoading(false);
  };

  const getLocationList = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&key=${googlePlacesApiKey}`
    );
    const json = await response.json();
    setLocationList(json);
  };

  useEffect(() => {
    getUserData();
    getLocationList();

    console.log(locationList);
  }, []);

  return (
    <>
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
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default HomeScreen;
