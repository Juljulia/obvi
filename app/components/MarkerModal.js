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

import Button from "../components/Button";
import Text from "../components/typography/Text";
import colors from "../config/colors";
import MessageBubble from "./MessageBubble";
import ProfileImage from "./ProfileImage";
import H2 from "./typography/H2";
import Subheading from "./typography/Subheading";

const value = new Animated.Value(0);

const saveModalTranslationY = value.interpolate({
  inputRange: [0, 1],
  outputRange: [600, 0],
});

function MarkerModal({
  visible,
  name,
  orientation,
  username,
  pronoun,
  imageData,
  message,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setShowModal(visible);
    Animated.timing(value, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (!visible) setShowMore(false);
  }, [visible]);

  if (showModal) {
    return (
      <View style={styles.container}>
        <Animated.View style={styles.innerContainer}>
          <TouchableOpacity
            style={{ position: "absolute", top: 15, height: 20, width: 50 }}
            onPress={() => setShowModal(false)}
          >
            <View style={styles.closeButton} />
          </TouchableOpacity>
          <ProfileImage
            style={styles.profileImg}
            imageUrl={imageData}
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
                <H2 style={styles.h2}>{username}</H2>
                <Text style={{ lineHeight: 20 }}>{pronoun}</Text>
                <Text style={{ lineHeight: 20 }}>{orientation}</Text>
                <Text style={{ lineHeight: 20 }}>3 kilometers away</Text>
              </View>
              <View style={styles.checkinInfo}>
                <View style={styles.checkedIn}>
                  <TouchableOpacity onPress={() => setShowMore(true)}>
                    <Subheading>Now checked in</Subheading>
                  </TouchableOpacity>
                  <Image source={require("../assets/checked-in.png")} />
                </View>
                <Text style={{ textDecorationLine: "underline" }}>{name}</Text>
              </View>
            </View>
            {showMore && (
              <>
                {message && <MessageBubble text={message} />}
                <H2 style={{ width: "100%", marginTop: 8 }}>Stay</H2>
                <Image source={require("../assets/counter.png")} />
                <CountdownCircleTimer
                  isPlaying
                  duration={3600}
                  colors={[[colors.primary]]}
                  trailColor="#e8e8e8"
                  size={160}
                >
                  {({ remainingTime }) => {
                    const hours = Math.floor(remainingTime / 3600);
                    const minutes = Math.floor((remainingTime % 3600) / 60);

                    remainingTime = `${hours}:${minutes}`;

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
                          {remainingTime}
                        </Animated.Text>
                      </ImageBackground>
                    );
                  }}
                </CountdownCircleTimer>
              </>
            )}

            <Button style={{ marginTop: 30 }} title="Visit Profile" />
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
    maxHeight: 430,
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
    paddingBottom: 50,
  },
  progressBarBg: {
    alignItems: "center",
    justifyContent: "center",
    width: 205,
    height: 205,
  },
});

export default MarkerModal;
