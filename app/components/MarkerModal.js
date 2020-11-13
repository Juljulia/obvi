import React, { useEffect, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { getDistance } from "geolib";

import Button from "../components/Button";
import Text from "../components/typography/Text";
import colors from "../config/colors";
import MessageBubble from "./MessageBubble";
import ProfileImage from "./ProfileImage";
import H2 from "./typography/H2";
import Subheading from "./typography/Subheading";
import TimeBubble from "./TimeBubble";
import useLocation from "../hooks/useLocation";
import navigation from "../navigation/rootNavigation";
import routes from "../navigation/routes";
import { screen } from "../config/dimensions";

const value = new Animated.Value(0);

const saveModalTranslationY = value.interpolate({
  inputRange: [0, 1],
  outputRange: [600, 0],
});

function MarkerModal({
  visible,
  user: checkedInUser,
  name,
  message,
  activeTime,
  duration,
  geoLocation,
  newCheckIn,
  onPress,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState();
  const [distance, setDistance] = useState();
  const userLocation = useLocation();
  const { user } = useAuth();

  const getTimeRemaining = () => {
    const activeToInSec = activeTime / 1000;
    const nowInSec = Date.parse(new Date()) / 1000;
    const timeRemainingInSec = activeToInSec - nowInSec;
    setTimeRemaining(timeRemainingInSec);
  };

  useEffect(() => {
    setShowModal(visible);
    Animated.timing(value, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (!visible) setShowMore(false);
  }, [visible]);

  useEffect(() => {
    getTimeRemaining();
  }, [activeTime]);

  useEffect(() => {
    if (userLocation && geoLocation) {
      const distanceToUser = Math.floor(
        getDistance(geoLocation, userLocation) / 1000
      );
      setDistance(distanceToUser);
    }
  }, [geoLocation]);

  useEffect(() => {
    if (newCheckIn) {
      setShowMore(true);
    }
  }, [newCheckIn]);

  const handlePress = () => {
    if (user.uid === checkedInUser.uid) {
      navigation.navigate(routes.ACCOUNT);
    } else {
      navigation.navigate(routes.VISITPROFILE, {
        user: checkedInUser,
        ...(distance && { distance }),
      });
    }
  };

  if (showModal) {
    return (
      <View style={styles.container}>
        <Animated.View style={styles.innerContainer}>
          <TouchableOpacity
            style={{ position: "absolute", top: 15, height: 20, width: 50 }}
            onPress={onPress}
          >
            <View style={styles.closeButton} />
          </TouchableOpacity>
          <ProfileImage
            style={styles.profileImg}
            imageUrl={checkedInUser.imageData}
            imgWidth={59}
            imgHeight={59}
            imgBorderRadius={29.5}
            bgWidth={72}
            bgHeight={72}
          />
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={styles.scrollView}
          >
            <View style={styles.info}>
              <View style={styles.userInfo}>
                <H2 style={styles.h2}>{checkedInUser.username}</H2>
                <Text style={{ lineHeight: 20 }}>{checkedInUser.pronoun}</Text>
                <Text style={{ lineHeight: 20 }}>
                  {checkedInUser.orientation}
                </Text>
                {distance && (
                  <Text style={{ lineHeight: 20 }}>
                    {distance} kilometers away
                  </Text>
                )}
              </View>
              <View style={styles.checkinInfo}>
                <View style={styles.checkedIn}>
                  <TouchableOpacity onPress={() => setShowMore(true)}>
                    <Subheading style={styles.checkedInLink(showMore)}>
                      Now checked in
                    </Subheading>
                  </TouchableOpacity>
                  <Image source={require("../assets/checked-in.png")} />
                </View>
                <Text style={{ textDecorationLine: "underline" }}>{name}</Text>
              </View>
            </View>
            {showMore && (
              <>
                {message && (
                  <MessageBubble style={{ marginTop: 20 }} text={message} />
                )}
                <H2 style={{ width: "100%", marginTop: 18 }}>Stay</H2>
                {activeTime && (
                  <View style={{ marginBottom: 15, alignItems: "center" }}>
                    <TimeBubble text={duration} />
                    <CountdownCircleTimer
                      isPlaying
                      initialRemainingTime={timeRemaining}
                      duration={duration * 3600}
                      colors={[[colors.primary]]}
                      trailColor="#e8e8e8"
                      size={160}
                    >
                      {() => {
                        const hours = Math.floor(timeRemaining / 3600);
                        const minutes = Math.floor((timeRemaining % 3600) / 60);

                        const showTimeRemaining = `${hours}:${
                          minutes < 10 ? "0" + minutes : minutes
                        }`;

                        return (
                          <ImageBackground
                            source={require("../assets/progress-bar-bg.png")}
                            style={[styles.progressBarBg]}
                          >
                            <Animated.Text
                              style={{
                                color: colors.night,
                                fontFamily: "Inter_500Medium",
                                fontSize: 12,
                              }}
                            >
                              {showTimeRemaining}
                            </Animated.Text>
                          </ImageBackground>
                        );
                      }}
                    </CountdownCircleTimer>
                  </View>
                )}
              </>
            )}

            <Button
              style={{ width: 280, marginTop: 30 }}
              title="Visit Profile"
              onPress={handlePress}
            />
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    maxHeight: screen.height * 0.75,
    backgroundColor: colors.basicGrey,
  },
  closeButton: {
    backgroundColor: colors.mediumGrey,
    height: 5,
    width: 35,
    borderRadius: 5,
  },
  innerContainer: {
    transform: [
      {
        translateY: saveModalTranslationY,
      },
    ],
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: colors.basicGrey,
    paddingTop: 50,
    borderTopRightRadius: 30,
    shadowColor: "#88A0B7",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    alignItems: "center",
    paddingBottom: 65,
  },
  profileImg: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -60,
    left: 0,
    backgroundColor: colors.basicGrey,
    width: 116,
    height: 116,
    borderRadius: 58,
  },
  info: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  userInfo: {
    width: "49%",
  },
  checkinInfo: {
    marginTop: 22,
    width: "49%",
  },
  checkedIn: {
    flexDirection: "row",
    alignItems: "center",
  },
  h2: {
    marginBottom: 8,
  },
  scrollView: {
    alignItems: "center",
    paddingHorizontal: 22,
    paddingBottom: 65,
  },
  progressBarBg: {
    alignItems: "center",
    justifyContent: "center",
    width: 205,
    height: 205,
  },
  checkedInLink: (showMore) => ({
    textDecorationLine: showMore ? "none" : "underline",
  }),
});

export default MarkerModal;
