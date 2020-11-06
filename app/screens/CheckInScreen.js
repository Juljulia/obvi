import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import * as Yup from "yup";
import { Dimensions } from "react-native";

import getEnvVars from "../../environment";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/typography/Text";
import useAuth from "../auth/useAuth";
import useLocation from "../hooks/useLocation";
import usersApi from "../api/users";
import FormField from "../components/forms/FormField";
import Form from "../components/forms/Form";
import NavArrow from "../components/nav/NavArrow";
import SubmitButton from "../components/forms/SubmitButton";
import Slider from "../components/Slider";
import SearchInput from "../components/SearchInput";
import UploadScreen from "../screens/UploadScreen";
import ScreenTitle from "../components/ScreenTitle";
import H2 from "../components/typography/H2";
import H1 from "../components/typography/H1";

const validationSchema = Yup.object().shape({
  message: Yup.string().label("Message"),
});
const screenWidth = Dimensions.get("window").width;

function CheckInScreen({ navigation }) {
  const { user } = useAuth();
  const location = useLocation();
  const [places, setPlaces] = useState();
  const { googlePlacesApiKey } = getEnvVars();
  const [showPlaces, setShowPlaces] = useState(false);
  const [choosenPlace, setChoosenPlace] = useState();
  const [closeList, setCloseList] = useState(true);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [checkinDuration, setCheckinDuration] = useState([1]);
  const [showText, setShowText] = useState(true);
  const db = firebase.firestore();

  useEffect(() => {
    getPlaces();
  }, [location]);

  const getPlaces = async () => {
    if (location) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location["latitude"]},${location["longitude"]}&radius=1000&key=${googlePlacesApiKey}`
      );
      const json = await response.json();
      setPlaces(json.results);
      setShowPlaces(true);
    }
  };

  const searchPlaces = async (value) => {
    setChoosenPlace(value);
    setCloseList(false);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${value}&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry,types,place_id&key=${googlePlacesApiKey}`
    );
    const json = await response.json();
    setPlaces(json.candidates);
    setShowPlaces(true);
    if (json.status === "INVALID_REQUEST") {
      setShowPlaces(false);
      getPlaces();
    }
  };

  const handleChoosePlace = (item) => {
    setChoosenPlace(item);
    setCloseList(true);
    setShowText(true);
  };

  const handleSubmit = async ({ message }, { resetForm }) => {
    //Get date in milliseconds
    const dateInMs = Date.parse(new Date());
    const activeToDateInMs = dateInMs + checkinDuration[0] * 3600000;

    if (message === "") message = null;

    // STORE CHECK IN (Place, message, time and image)
    const { imageData } = await usersApi.getUser(user.uid);
    const adress = choosenPlace.formatted_address;

    const checkIn = {
      name: choosenPlace.name,
      location: {
        latitude: choosenPlace.geometry.location.lat,
        longitude: choosenPlace.geometry.location.lng,
      },
      ...(adress && { adress }),
      placeId: choosenPlace.place_id,
      categories: choosenPlace.types,
      imageUrl: imageData,
      userId: user.uid,
      message: message,
      activeTo: activeToDateInMs,
      duration: checkinDuration[0],
    };

    db.collection("checkIns")
      .doc()
      .set(checkIn)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    setUploadVisible(true);

    //Reset values
    setChoosenPlace(null);
    setCheckinDuration([1]);
    setCloseList(false);
    resetForm();
  };

  const navigate = () => {
    navigation.navigate(routes.MAP, { update: true });
    setUploadVisible(false);
  };

  const onPressSearchInput = () => {
    setCloseList(false);
    setShowText(false);

    console.log(closeList);
    console.log(showText);
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen onDone={navigate} visible={uploadVisible} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.arrow}
      >
        <NavArrow goBack={true}></NavArrow>
      </TouchableOpacity>
      <ScreenTitle>Check-In</ScreenTitle>

      <ScrollView scrollEnabled={closeList}>
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={styles.textWrapper(showText)}>
            <H2 style={{ marginBottom: 16 }}>
              Find and connect with nearby places, friends and more.
            </H2>
            <Text>
              Obvi needs your location to make some features work. You can
              always change this later in your phone’s settings.
            </Text>

            <H1 style={{ marginTop: 19 }}>Check In</H1>
          </View>

          {/** SEARCH */}
          <SearchInput
            inputWidth={screenWidth * 0.85}
            style={{ marginTop: 28, marginHorizontal: 30 }}
            results={places}
            keyExtractor={(place) => place.place_id.toString()}
            onChangeText={(value) => searchPlaces(value)}
            value={choosenPlace ? choosenPlace.name : ""}
            placeholder="Where are you?"
            icon="map-search-outline"
            closeList={closeList}
            showResults={showPlaces}
            onPress={onPressSearchInput}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.places}
                onPress={() => handleChoosePlace(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </KeyboardAvoidingView>

        <View style={{ paddingHorizontal: 30 }}>
          {/** SLIDER */}
          <H2 style={{ marginBottom: 13 }}>Stay</H2>
          <Text>For how long are you planning to stay?</Text>
          <Text>Let the community know.</Text>
          <Slider
            onValuesChange={(value) => setCheckinDuration(value)}
            values={checkinDuration}
            length={screenWidth * 0.85}
          />

          {/** MESSAGE */}
          <View style={styles.messageContainer}>
            <Form
              initialValues={{ message: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <H2 style={{ marginBottom: 14, marginTop: 18 }}>Message</H2>
              <Text>Give a shout out, tell us what's up! </Text>
              <FormField
                height={176}
                width={screenWidth * 0.85}
                style={{ padding: 20, marginTop: 15 }}
                inputStyle={{ height: "100%" }}
                multiline
                maxLength={255}
                name="message"
                placeholder="Write your message"
              />
              {closeList ? (
                <SubmitButton style={{ width: 280 }} title="Check in" />
              ) : (
                <SubmitButton
                  style={{ width: 280 }}
                  disabled={true}
                  disabledStyle
                  title="Check in"
                />
              )}
            </Form>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 200,
  },
  places: {
    padding: 10,
  },
  textWrapper: (showText) => ({
    marginHorizontal: 30,
    marginTop: 50,
    display: showText ? "flex" : "none",
  }),
});

export default CheckInScreen;
