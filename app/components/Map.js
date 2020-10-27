import React, { useState, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import usersApi from "../api/users";
import mapStyle from "./../config/mapStyle";
import MarkerModal from "../components/MarkerModal";
import useLocation from "../hooks/useLocation";

const deltas = {
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

function Map(props) {
  const [checkIns, setCheckIns] = useState([]);
  const db = firebase.firestore();
  const location = useLocation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [region, setRegion] = useState();

  const getCheckIns = async () => {
    let places = [];
    await db
      .collection("checkIns")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, ' => ', doc.data());
          places.push(doc.data());
        });
      });
    setCheckIns(places);
  };

  const getMarkerInfo = async (checkIn) => {
    const location = checkIn.location;
    const user = await usersApi.getUser(checkIn.userId);
    setRegion({
      ...location,
      ...deltas,
    });
    setModalInfo({ ...user, ...checkIn });
    setModalVisible(true);
    console.log(modalInfo);
  };

  useEffect(() => {
    if (location) {
      setRegion({
        ...location,
        ...deltas,
      });
    }

    getCheckIns();
  }, [location]);

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
        {checkIns &&
          checkIns.map((checkIn, i) => (
            <Marker
              key={i}
              coordinate={checkIn.location}
              onPress={() => getMarkerInfo(checkIn)}
            >
              <Image
                source={require("../assets/profile_image.png")}
                style={{ height: 35, width: 35 }}
              />
            </Marker>
          ))}
      </MapView>
      {modalVisible && (
        <MarkerModal
          modalVisible={modalVisible}
          name={modalInfo.name}
          username={modalInfo.username}
          orientation={modalInfo.orientation}
          adress={modalInfo.adress}
        ></MarkerModal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
