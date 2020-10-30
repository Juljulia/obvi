import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

import Button from "../components/Button";
import Card from "../components/Card";
import mapStyle from "./../config/mapStyle";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import routes from "../navigation/routes";
import Text from "../components/Text";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import useLocation from "../hooks/useLocation";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../config/colors";

function HomeScreen({ navigation }) {
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
    <ScrollView>
      <Screen style={styles.container}>
        {isLoading && !userData ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.welcome}>
            <Text>Hello {userData["username"]}</Text>
            <Button title="Logout" onPress={() => logOut()} />
          </View>
        )}
        <Card
          title="The Obvi map"
          // image={require("../assets/union.png")}
          subTitle="Show friends within the community"
        >
          {region && (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={region}
              customMapStyle={mapStyle}
              showsUserLocation
              region={region}
              onPress={() => navigation.navigate(routes.MAP)}
            ></MapView>
          )}
          <Image
            source={require("../assets/wave.png")}
            style={styles.wave}
          ></Image>
        </Card>
        <Card
          title="Check in"
          image={require("../assets/union.png")}
          subTitle="Show friends your exact location"
        ></Card>
        <Card
          title="Calendar"
          image={require("../assets/union.png")}
          subTitle="See upcoming events"
        ></Card>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  welcome: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },
  wave: {
    position: "absolute",
    bottom: -28,
    left: -24.5,
  },
});

export default HomeScreen;
