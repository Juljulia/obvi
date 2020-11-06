import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Text from "../components/typography/Text";
import H2 from "../components/typography/H2";
import NavArrow from "../components/nav/NavArrow";
import ProfileCard from "../components/ProfileCard";
import Screen from "../components/Screen";
import ScreenTitle from "../components/ScreenTitle";
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

  console.log(userData);
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
          <View>
            <H2>Passions</H2>
            <Text style={{ paddingTop: 12, lineHeight: 25, paddingBottom: 24 }}>
              {passions}
            </Text>
          </View>
          <View>
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
            </ScrollView>
            <Text
              style={{ textDecorationLine: "underline", paddingBottom: 32 }}
            >
              View all
            </Text>
          </View>
          <View>
            <H2>Frequent check-ins</H2>
            <Text style={{ paddingBottom: 12, lineHeight: 25 }}>
              Ocianen, Folk, Frilagret, Stadsbiblioteket, Super Sushi,
              Dansforum, Condeco, Streetlife
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
  },
  container: {
    paddingHorizontal: 30,
    paddingBottom: 120,
    position: "relative",
    top: -20,
    zIndex: -1,
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 70,
  },
  text: {
    marginTop: 15,
  },
});

export default AccountScreen;
