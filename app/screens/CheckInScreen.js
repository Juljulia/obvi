import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import getEnvVars from "../../environment";
import Text from "../components/Text";
import TextInput from "../components/TextInput";

function CheckInScreen(props) {
  const [locationList, setLocationList] = useState();
  const { googlePlacesApiKey } = getEnvVars();

  const getLocationList = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=actic&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&key=${googlePlacesApiKey}`
    );
    const json = await response.json();
    setLocationList(json);
  };

  useEffect(() => {
    getLocationList();
  }, []);

  console.log(locationList);

  const searchLocations = async (value) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${value}&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&key=${googlePlacesApiKey}`
    );
    const json = await response.json();
    setLocationList(json);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Check In</Text>
      <TextInput
        placeholder="Where are you?"
        icon="map-search-outline"
        onChangeText={(value) => searchLocations(value)}
      />
      <View>
        {locationList ? (
          locationList.candidates.map((location, key) => (
            <Text key={key}>{location.name}</Text>
          ))
        ) : (
          <Text>No result</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CheckInScreen;
