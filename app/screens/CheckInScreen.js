import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import getEnvVars from "../../environment";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import useLocation from "../hooks/useLocation";

function CheckInScreen(props) {
  const location = useLocation();
  const [placesList, setPlacesList] = useState();
  const { googlePlacesApiKey } = getEnvVars();
  const [showPlaces, setShowPlaces] = useState(false);

  const getPlacesList = async () => {
    if (location) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location["latitude"]},${location["longitude"]}&radius=1000&key=${googlePlacesApiKey}`
      );
      const json = await response.json();
      setPlacesList(json.results);
      setShowPlaces(true);
    }
  };

  useEffect(() => {
    getPlacesList();
  }, []);

  const searchPlaces = async (value) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${value}&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&key=${googlePlacesApiKey}`
    );
    const json = await response.json();
    setPlacesList(json.candidates);
    setShowPlaces(true);
    if (json.status === "INVALID_REQUEST") {
      setShowPlaces(false);
      getPlacesList();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Check In</Text>
      <TextInput
        placeholder="Where are you?"
        icon="map-search-outline"
        onChangeText={(value) => searchPlaces(value)}
      />
      <View>
        {!showPlaces ? (
          <Text>No result</Text>
        ) : (
          placesList.map((location, key) => (
            <Text key={key}>{location.name}</Text>
          ))
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CheckInScreen;
