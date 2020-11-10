import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import H2 from "../components/typography/H2";
import NavArrow from "../components/nav/NavArrow";
import ProfileCard from "../components/ProfileCard";
import Screen from "../components/Screen";
import ScreenTitle from "../components/ScreenTitle";
import Text from "../components/typography/Text";
import Button from "../components/Button";
import colors from "../config/colors";
import FriendsScroll from "../components/FriendsScroll";

function VisitProfileScreen({ navigation, route }) {
  const user = route.params.user;
  const distance = route.params.distance;

  return (
    <ScrollView>
      <Screen>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <NavArrow goBack={true}></NavArrow>
        </TouchableOpacity>
        <ScreenTitle>My Profile</ScreenTitle>
        <View style={styles.container}>
          <ProfileCard
            name={user.username}
            showPronoun={user.showPronoun}
            showOrientation={user.showOrientation}
            pronoun={user.pronoun}
            orientation={user.orientation}
            imageData={user.imageData}
            distance={distance}
          />
          <Button style={{ width: 280 }} title="Message" />
          <Button
            style={{
              width: 280,
              backgroundColor: colors.basicGrey,
              marginBottom: 37,
            }}
            textStyle={{
              color: colors.text,
              fontSize: 12,
              fontFamily: "Inter_500Medium",
            }}
            title="+ Add friend"
          />
          <View style={styles.innerContainer}>
            <H2 style={styles.innerTitle}>Passions</H2>
            <Text style={{ lineHeight: 25 }}>{user.passions}</Text>
          </View>
          <FriendsScroll
            title="Mutual friends"
            style={styles.innerContainer}
            friends={[
              { image: require("../assets/avatars/5.png") },
              { image: require("../assets/avatars/6.png") },
              { image: require("../assets/avatars/7.png") },
              { image: require("../assets/avatars/8.png") },
            ]}
          />
          <View style={styles.innerContainer}>
            <H2 style={styles.innerTitle}>Frequent check-ins</H2>
            <Text style={{ lineHeight: 25, textDecorationLine: "underline" }}>
              Ocianen, Folk, Frilagret, Stadsbiblioteket, Super Sushi,
              Dansforum, Condeco, Streetlife
            </Text>
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

export default VisitProfileScreen;
