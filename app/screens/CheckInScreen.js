import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

import getEnvVars from "../../environment";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import navigation from "../navigation/rootNavigation";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import useAuth from "../auth/useAuth";
import useLocation from "../hooks/useLocation";

function CheckInScreen() {
  const { user } = useAuth();
  const location = useLocation();
  const [places, setPlaces] = useState();
  const { googlePlacesApiKey } = getEnvVars();
  const [showPlaces, setShowPlaces] = useState(false);
  const db = firebase.firestore();

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

  useEffect(() => {
    getPlaces();
    getCheckIns();
  }, [location]);

  const searchPlaces = async (value) => {
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

  const handlePress = (item) => {
    Alert.alert("Check-in", "Are you sure you want to check-in?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: () => storeCheckIn(item) },
    ]);
  };

  const storeCheckIn = (item) => {
    // console.log(item);
    const adress = item.formatted_address;
    const place = {
      name: item.name,
      location: {
        latitude: item.geometry.location.lat,
        longitude: item.geometry.location.lng,
      },
      ...(adress && { adress }),
      placeId: item.place_id,
      categories: item.types,
      userId: user.uid,
    };

    db.collection("checkIns")
      .doc()
      .set(place)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    navigation.navigate(routes.HOME);
  };

  const getCheckIns = async () => {
    const docRef = await db
      .collection("checkIns")
      .where("userId", "==", user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
        });
      });
  };

  return (
    <Screen>
      <Text>Check-In</Text>
      <TextInput
        placeholder="Where are you?"
        icon="map-search-outline"
        onChangeText={(value) => searchPlaces(value)}
      />
      <View>
        {!showPlaces ? (
          <Text>No result</Text>
        ) : (
          <FlatList
            data={places}
            keyExtractor={(place) => place.place_id.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.places}
                onPress={() => handlePress(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  places: {
    padding: 10,
  },
});

export default CheckInScreen;
