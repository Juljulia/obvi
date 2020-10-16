import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import getEnvVars from "../../environment";
import Text from "../components/Text";

function CheckInScreen(props) {
  const [locationList, setLocationList] = useState();
  const { googlePlacesApiKey } = getEnvVars();

  const getLocationList = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry&key=${googlePlacesApiKey}`
    );
    const json = await response.json();
    setLocationList(json);
  };

  useEffect(() => {
    getLocationList();
    console.log(locationList);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Check In</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CheckInScreen;
