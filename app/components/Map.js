import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import "firebase/firestore";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import usersApi from "../api/users";
import mapStyle from "./../config/mapStyle";
import MarkerModal from "../components/MarkerModal";

const deltas = {
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

function Map({ region, pins }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const getMarkerInfo = async (pin) => {
    const location = pin.location;
    const user = await usersApi.getUser(pin.userId);
    region = {
      ...location,
      ...deltas,
    };
    setModalInfo({ ...user, ...pin });
    setModalVisible(true);
  };

  return (
    <>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        customMapStyle={mapStyle}
        showsMyLocationButton
        showsUserLocation
        onPanDrag={() => setModalVisible(false)}
      >
        {pins &&
          pins.map((pin, i) => (
            <Marker
              key={i}
              coordinate={pin.location}
              onPress={() => getMarkerInfo(pin)}
            >
              {pin.imageUrl ? (
                <Image
                  source={{
                    uri: pin.imageUrl,
                  }}
                  style={styles.profileIcon}
                />
              ) : (
                <Image
                  source={require("../assets/default.png")}
                  style={styles.defaultMarker}
                />
              )}
            </Marker>
          ))}
      </MapView>
      <MarkerModal
        visible={modalVisible}
        name={modalInfo.name}
        username={modalInfo.username}
        orientation={modalInfo.orientation}
        adress={modalInfo.adress}
        pronoun={modalInfo.pronoun}
        imageData={modalInfo.imageData}
        message={modalInfo.message}
      />
    </>
  );
}

const styles = StyleSheet.create({
  defaultMarker: {
    height: 35,
    width: 35,
  },
  map: {
    flex: 1,
  },
  profileIcon: {
    height: 35,
    width: 35,
    borderRadius: 35,
  },
});

export default Map;
