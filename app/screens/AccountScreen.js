import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import H2 from "../components/typography/H2";
import NavArrow from "../components/nav/NavArrow";
import ProfileCard from "../components/ProfileCard";
import Screen from "../components/Screen";
import ScreenTitle from "../components/ScreenTitle";
import Text from "../components/typography/Text";
import usersApi from "../api/users";

function AccountScreen({ navigation }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const {
    username,
    imageData,
    pronoun,
    orientation,
    showPronoun,
    showOrientation,
    passions,
  } = userData;

  const getUserData = async () => {
    const userAuthData = await usersApi.getUser(user.uid);
    setUserData(userAuthData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ScrollView>
      <Screen>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <NavArrow goBack={true}></NavArrow>
        </TouchableOpacity>
        <ScreenTitle>My Profile</ScreenTitle>
        <View style={styles.container}>
          <ProfileCard
            name={username}
            showPronoun={showPronoun}
            showOrientation={showOrientation}
            pronoun={pronoun}
            orientation={orientation}
            imageData={imageData}
          ></ProfileCard>
          <View style={styles.innerContainer}>
            <H2 style={styles.innerTitle}>Passions</H2>
            <Text style={{ lineHeight: 25 }}>{passions}</Text>
          </View>
          <View style={styles.innerContainer}>
            <H2>Friends</H2>
            <ScrollView
              horizontal
              style={{ paddingTop: 16, paddingBottom: 16 }}
            >
              <Image
                source={require("../assets/avatars/1.png")}
                style={styles.avatar}
              />
              <Image
                source={require("../assets/avatars/2.png")}
                style={styles.avatar}
              />
              <Image
                source={require("../assets/avatars/3.png")}
                style={styles.avatar}
              />
              <Image
                source={require("../assets/avatars/4.png")}
                style={styles.avatar}
              />
              <Image
                source={require("../assets/avatars/5.png")}
                style={styles.avatar}
              />
              <Image
                source={require("../assets/avatars/6.png")}
                style={styles.avatar}
              />
              <Image
                source={require("../assets/avatars/7.png")}
                style={styles.avatar}
              />
              <Image
                source={require("../assets/avatars/8.png")}
                style={styles.avatar}
              />
            </ScrollView>
            <Text
              style={{ textDecorationLine: "underline", paddingBottom: 32 }}
            >
              View all
            </Text>
          </View>
          <View style={styles.innerContainer}>
            <H2 style={styles.innerTitle}>Frequent check-ins</H2>
            <Text style={{ lineHeight: 25 }}>
              Ocianen, Folk, Frilagret, Stadsbiblioteket, Super Sushi,
              Dansforum, Condeco, Streetlife
            </Text>
          </View>
          <View>
            <H2 style={styles.innerTitle}>Calendar</H2>
            <Text style={{ paddingBottom: 12, lineHeight: 25 }}>
              Queer takeover, Lesbisk frukost, Julmarknad
            </Text>
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginHorizontal: 4,
    width: 78,
    height: 78,
  },
  container: {
    paddingHorizontal: 30,
    paddingBottom: 60,
    position: "relative",
    top: -20,
    zIndex: -1,
  },
  innerContainer: {
    paddingBottom: 24,
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 70,
  },
  innerTitle: {
    paddingBottom: 12,
  },
  text: {
    marginTop: 15,
  },
});

export default AccountScreen;
