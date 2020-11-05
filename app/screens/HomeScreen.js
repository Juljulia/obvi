import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";

import Avatars from "../components/Avatars";
import Button from "../components/Button";
import Card from "../components/Card";
import mapStyle from "./../config/mapStyle";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import routes from "../navigation/routes";
import Text from "../components/typography/Text";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import useLocation from "../hooks/useLocation";
import colors from "../config/colors";
import NavIcon from "../components/nav/NavIcon";
import H2 from "../components/typography/H2";
import TextInput from "../components/TextInput";

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
        <Image
          source={require("../assets/logo-small.png")}
          style={styles.logo}
          resizeMode="contain"
        ></Image>
        {isLoading && !userData ? (
          <ActivityIndicator />
        ) : (
          <>
            <View style={{ paddingHorizontal: 30 }}>
              <Text>Hello, </Text>
              <H2>{userData["username"]}</H2>
            </View>
            <View style={styles.navContainer}>
              <NavIcon
                icon={require("../assets/icons/compas.png")}
                onPress={() => navigation.navigate(routes.MAP)}
              />
              <NavIcon
                icon={require("../assets/icons/location.png")}
                onPress={() => navigation.navigate(routes.CHECKIN)}
              />
              <NavIcon icon={require("../assets/icons/calender.png")} />
              <NavIcon icon={require("../assets/icons/chat.png")} />
            </View>
            <View style={styles.cardContainer}>
              <H2 style={styles.heading}>Community forum</H2>
              <View style={styles.inputContainer}>
                <Image source={require("../assets/Camera.png")} />
                <TextInput
                  style={{ height: 48, marginTop: 0, marginBottom: 0 }}
                  width={259}
                  placeholder="Tell/ask the community"
                />
                <Image
                  style={styles.sendButton}
                  source={require("../assets/send.png")}
                />
              </View>
              <Card
                title="Sally"
                image={require("../assets/images/coffee.png")}
                subTitle="Hello, what's the best place to go for a cup of coffee in the city?"
              ></Card>
              <Card
                title="Calendar"
                image={require("../assets/union.png")}
                subTitle="See upcoming events"
              ></Card>
            </View>
          </>
        )}
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: "center",
    marginTop: 32,
    marginBottom: 24,
    width: 69,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 39,
    marginBottom: 48,
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 30,
    marginBottom: 59,
  },
  sendButton: {
    position: "absolute",
    right: 10,
  },
  heading: {
    width: "100%",
    marginBottom: 35,
    paddingHorizontal: 30,
  },
});

export default HomeScreen;
