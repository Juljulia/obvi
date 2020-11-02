import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import * as Yup from "yup";

import getEnvVars from "../../environment";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/typography/Text";
import useAuth from "../auth/useAuth";
import useLocation from "../hooks/useLocation";
import usersApi from "../api/users";
import FormField from "../components/forms/FormField";
import Form from "../components/forms/Form";
import NavArrow from "../components/NavArrow";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/colors";
import Slider from "../components/Slider";
import SearchInput from "../components/SearchInput";

const validationSchema = Yup.object().shape({
  message: Yup.string().label("Message"),
});

function CheckInScreen({ navigation }) {
  const { user } = useAuth();
  const location = useLocation();
  const [places, setPlaces] = useState();
  const { googlePlacesApiKey } = getEnvVars();
  const [showPlaces, setShowPlaces] = useState(false);
  const [choosenPlace, setChoosenPlace] = useState();
  const [closeList, setCloseList] = useState(false);
  const [checkinDuration, setCheckinDuration] = useState([1]);
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

    //Reset values
    setChoosenPlace(null);
    setCheckinDuration([1]);
    setCloseList(false);
    resetForm();

    navigation.navigate(routes.MAP, { update: true });
  };

  return (
    <Screen style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.arrow}
      >
        <NavArrow goBack={true}></NavArrow>
      </TouchableOpacity>
      <Text>Check-In</Text>

      {/** SEARCH */}
      <SearchInput
        results={places}
        keyExtractor={(place) => place.place_id.toString()}
        onChangeText={(value) => searchPlaces(value)}
        value={choosenPlace ? choosenPlace.name : ""}
        placeholder="Where are you?"
        icon="map-search-outline"
        closeList={closeList}
        showResults={showPlaces}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.places}
            onPress={() => handleChoosePlace(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <ScrollView>
        {/** SLIDER */}
        <Text>Stay</Text>
        <Text>
          For how long are you planning to stay? Let the community know.
        </Text>
        <Slider
          onValuesChange={(value) => setCheckinDuration(value)}
          values={checkinDuration}
        />

        {/** MESSAGE */}
        <View style={styles.messageContainer}>
          <Form
            initialValues={{ message: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Text>Message</Text>
            <Text>Give a shout out, tell us what's up! </Text>
            <FormField
              maxLength={255}
              multiline
              textAlignVertical="top"
              name="message"
              numberOfLines={3}
              placeholder="Message..."
            />
            {closeList ? (
              <SubmitButton title="Check in" />
            ) : (
              <SubmitButton disabled={true} disabledStyle title="Check in" />
            )}
          </Form>
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
});

export default CheckInScreen;
