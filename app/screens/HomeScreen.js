import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";
import mapStyle from "./../config/mapStyle";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import navigation from "../navigation/rootNavigation";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import useLocation from "../hooks/useLocation";

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

  useEffect(() => {
    if (location) {
      setRegion({
        ...location,
        ...deltas,
      });
    }

    getUserData();
  }, [location]);

  return (
    <Screen style={styles.container}>
      {isLoading && !userData ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.welcome}>
          <Text>Welcome {/*userData["username"]*/}</Text>
          <Button title="Logout" onPress={() => logOut()} />
        </View>
      )}
      {region && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={region}
          customMapStyle={mapStyle}
          showsMyLocationButton
          showsUserLocation
          region={region}
          onPress={() => navigation.navigate(routes.MAP)}
        ></MapView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  welcome: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },
});

export default HomeScreen;
