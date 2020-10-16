import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import useAuth from '../auth/useAuth';
import Button from '../components/Button';
import usersApi from '../api/users';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from './../config/mapStyle';

function HomeScreen(props) {
  const { user, logOut } = useAuth();
  const [userData, setUserData] = useState();

  const getData = async () => {
    const data = await usersApi.getUser(user.uid);
    setUserData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!userData) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Welcome {userData['username']}</Text>
        <Button title="Logout" onPress={() => logOut()} />
      </SafeAreaView>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 57.70547,
          longitude: 11.968415,
          latitudeDelta: 0.015, //avgör hur inzoomat det ska vara från början
          longitudeDelta: 0.0121,
        }}
        customMapStyle={mapStyle}
      ></MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default HomeScreen;
