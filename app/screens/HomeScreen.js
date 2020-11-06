import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";

import Card from "../components/Card";
import routes from "../navigation/routes";
import Text from "../components/typography/Text";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import useLocation from "../hooks/useLocation";
import NavIcon from "../components/nav/NavIcon";
import H2 from "../components/typography/H2";
import TextInput from "../components/TextInput";

const posts = [
  {
    name: "Sally",
    text: "Hello, what's the best place to go for a cup of coffee in the city?",
    image: require("../assets/images/coffee.png"),
    comments: 25,
    shared: 12,
    likes: 5,
    thread: false,
    commented: false,
    isShared: false,
    liked: false,
    postedTimeAgo: 4,
    profileImage: require("../assets/images/sally.jpeg"),
  },
  {
    name: "Elena",
    text: "Can anyone tell me where all the single femme lesbians are?!",
    comments: 60,
    shared: 40,
    likes: 150,
    thread: true,
    commented: false,
    isShared: false,
    liked: true,
    postedTimeAgo: 6,
    profileImage: require("../assets/images/elena.jpg"),
  },
  {
    name: "Mike",
    text:
      "Tell me if i'm wrong, but isn't Frilagret closed on Mondays? If so, anyone know a great place to hang on a Monday..?",
    comments: 30,
    shared: 3,
    likes: 34,
    thread: true,
    commented: true,
    isShared: false,
    liked: true,
    postedTimeAgo: 8,
    profileImage: require("../assets/images/mike.jpg"),
  },
  {
    name: "Jasmine",
    text:
      "I would like to find a second hand store with no gender sections? Is there any? Anyone want to come along and look for one? I have a car.",
    image: require("../assets/images/clothes.png"),
    comments: 25,
    shared: 12,
    likes: 65,
    thread: false,
    commented: false,
    isShared: true,
    liked: false,
    postedTimeAgo: 13,
    profileImage: require("../assets/images/jasmine.jpg"),
  },
  {
    name: "Leo",
    text: "Who wants to hang?",
    image: require("../assets/images/coffee.png"),
    comments: 40,
    shared: 6,
    likes: 80,
    thread: true,
    commented: true,
    isShared: false,
    liked: true,
    postedTimeAgo: 13,
    profileImage: require("../assets/images/leo.jpg"),
  },
];

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
              {posts.map((post, key) => (
                <Card
                  key={key}
                  title={post.name}
                  image={post.image}
                  text={post.text}
                  hours={post.postedTimeAgo}
                  comments={post.comments}
                  shared={post.shared}
                  likes={post.likes}
                  isCommented={post.commented}
                  isShared={post.isShared}
                  isLiked={post.liked}
                  isThread={post.thread}
                  profileImage={post.profileImage}
                />
              ))}
            </View>
          </>
        )}
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {},
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
