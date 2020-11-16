import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
const db = firebase.firestore();

import H2 from "../components/typography/H2";
import NavArrow from "../components/nav/NavArrow";
import ProfileCard from "../components/ProfileCard";
import Screen from "../components/Screen";
import ScreenTitle from "../components/ScreenTitle";
import Text from "../components/typography/Text";
import usersApi from "../api/users";
import FriendsScroll from "../components/FriendsScroll";

function AccountScreen({ navigation }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [checkIns, setCheckIns] = useState([]);
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

  useEffect(() => {
    if (userData.uid !== undefined) {
      getCheckIns();
    }
  }, [userData]);

  const getCheckIns = async () => {
    let checkInsArr = [];
    await db
      .collection("checkIns")
      .where("userId", "==", userData.uid)
      .limit(8)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          checkInsArr.push(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    setCheckIns(checkInsArr.reverse());
  };

  for (let i = 0; i < checkIns.length; i++) {
    const element = checkIns[i];

    for (let j = 0; j < checkIns.length; j++) {
      if (i !== j && element.name === checkIns[j].name) {
        checkIns.splice(i, 1);
      }
    }
  }

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
          />

          {passions && (
            <View style={styles.innerContainer}>
              <H2 style={styles.innerTitle}>Passions</H2>
              <Text style={{ lineHeight: 25 }}>{passions}</Text>
            </View>
          )}
          <FriendsScroll
            title="Friends"
            style={styles.innerContainer}
            friends={[
              { image: require("../assets/avatars/1.png") },
              { image: require("../assets/avatars/2.png") },
              { image: require("../assets/avatars/3.png") },
              { image: require("../assets/avatars/4.png") },
              { image: require("../assets/avatars/5.png") },
              { image: require("../assets/avatars/6.png") },
              { image: require("../assets/avatars/7.png") },
              { image: require("../assets/avatars/8.png") },
            ]}
          />
          <View style={styles.innerContainer}>
            <H2 style={styles.innerTitle}>Recent check-ins</H2>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {checkIns &&
                checkIns.map((checkIn, key) => (
                  <Text
                    key={key}
                    style={{ lineHeight: 25, textDecorationLine: "underline" }}
                  >
                    {checkIn.name + "  "}
                  </Text>
                ))}
            </View>
          </View>
          <View>
            <H2 style={styles.innerTitle}>Calendar</H2>
            <Text
              style={{
                paddingBottom: 12,
                lineHeight: 25,
                textDecorationLine: "underline",
              }}
            >
              Queer takeover, Lesbisk frukost, Julmarknad
            </Text>
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
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
