import React from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../components/typography/Text";
import colors from "../config/colors";
import H2 from "./typography/H2";
import ProfileImage from "./ProfileImage";

function Card({
  title,
  text,
  image,
  hours,
  comments,
  shared,
  likes,
  profileImage,
  isCommented,
  isShared,
  onPress,
  isLiked,
  isThread,
  ...otherProps
}) {
  return (
    <View style={styles.container}>
      <ProfileImage
        imgWidth={35}
        imgHeight={35}
        imgBorderRadius={17.5}
        bgWidth={40}
        bgHeight={40}
        localImageUrl={profileImage}
        style={styles.profileImage}
      />
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.cardContainer} {...otherProps}>
          <View style={styles.textContent}>
            <H2 style={{ marginBottom: 3 }}>{title}</H2>
            <Text style={styles.hours}>{hours}h</Text>
            <Text>{text}</Text>
          </View>
          <Image
            style={{ width: "100%", marginBottom: 7 }}
            source={image}
          ></Image>

          <View style={styles.interactions}>
            <View style={styles.interactionContainer}>
              <MaterialCommunityIcons
                style={{ marginRight: 2 }}
                size={18}
                name="comment"
                color={isCommented ? colors.basicBlue : colors.mediumGrey}
              />
              <Text>{comments}</Text>
            </View>
            <View style={styles.interactionContainer}>
              <MaterialCommunityIcons
                style={{ marginRight: 2 }}
                size={18}
                name="autorenew"
                color={isShared ? colors.primary : colors.mediumGrey}
              />
              <Text>{shared}</Text>
            </View>
            <View style={styles.interactionContainer}>
              <MaterialCommunityIcons
                style={{ marginRight: 2 }}
                size={18}
                name="cards-heart"
                color={isLiked ? "#EB5757" : colors.mediumGrey}
              />
              <Text>{likes}</Text>
            </View>
            <View style={[styles.interactionContainer, { width: 26 }]}>
              <MaterialCommunityIcons
                name="share-variant"
                color={colors.mediumGrey}
                size={18}
              />
            </View>
          </View>

          {isThread && <Text style={styles.thread}>Show this thread</Text>}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardContainer: {
    borderRadius: 32,
    backgroundColor: colors.basicGrey,
    marginBottom: 24,
    width: "72%",
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  hours: {
    position: "absolute",
    right: 0,
    color: colors.mediumGrey,
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 17,
    marginTop: 10,
    marginBottom: 25,
  },
  interactionContainer: {
    flexDirection: "row",
    width: 52,
    height: 26,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.basicGrey,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 2,
  },
  profileImage: {
    marginRight: 10,
  },
  textContent: {
    marginHorizontal: 17,
    marginVertical: 10,
  },
  thread: {
    marginLeft: 17,
    marginBottom: 17,
  },
});

export default Card;
