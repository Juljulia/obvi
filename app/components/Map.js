import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import "firebase/firestore";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import usersApi from "../api/users";
import mapStyle from "./../config/mapStyle";
import MarkerModal from "./MarkerModal";
import ProfileImage from "./ProfileImage";
import useLocation from "../hooks/useLocation";
import useAuth from "../auth/useAuth";
import MapMarker from "./MapMarker";

function Map({ initialRegion, pins, newCheckIn }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [loggedInUser, setLoggedInUser] = useState();
  const [checkedInUser, setCheckedInUser] = useState();
  const location = useLocation();
  const { user } = useAuth();
  const mapRef = useRef();

  const deltas = {
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const animateToRegion = (pin) => {
    mapRef.current.animateToRegion(
      {
        ...pin.location,
        ...deltas,
      },
      700
    );
  };

  const getLoggedInUser = async () => {
    const loggedInUser = await usersApi.getUser(user.uid);
    setLoggedInUser(loggedInUser);
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  useEffect(() => {
    if (newCheckIn) {
      getMarkerInfo(newCheckIn);
      animateToRegion(newCheckIn);
    }
  }, [newCheckIn]);

  const getMarkerInfo = async (pin) => {
    const user = await usersApi.getUser(pin.userId);
    setModalInfo({ ...user, ...pin });
    setModalVisible(true);
    setCheckedInUser(user);
  };

  return (
    <>
      <MapView
        customMapStyle={mapStyle}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
      >
        {loggedInUser && location && (
          <Marker coordinate={location}>
            <MapMarker imageUrl={loggedInUser.imageData} />
          </Marker>
        )}
        {pins &&
          pins.map((pin, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: pin.location.latitude - Math.random() * 0.0005 + 0,
                longitude: pin.location.longitude - Math.random() * 0.0005 + 0,
              }}
              onPress={() => getMarkerInfo(pin) + animateToRegion(pin)}
            >
              <ProfileImage
                imageUrl={pin.imageUrl}
                imgWidth={40}
                imgHeight={40}
                imgBorderRadius={20}
                bgWidth={50}
                bgHeight={50}
              />
            </Marker>
          ))}
      </MapView>
      <MarkerModal
        visible={modalVisible}
        name={modalInfo.name}
        adress={modalInfo.adress}
        message={modalInfo.message}
        activeTime={modalInfo.activeTo}
        duration={modalInfo.duration}
        geoLocation={modalInfo.location}
        user={checkedInUser}
        newCheckIn={newCheckIn}
        onPress={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
