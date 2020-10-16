import React from 'react';
import { StyleSheet } from 'react-native';
import mapStyle from './../config/mapStyle';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const places = [
  {
    title: 'Julia',
    description: 'Nordic Wellness 1',
    coords: {
      latitude: 57.700153,
      longitude: 11.984456,
    },
  },
  {
    title: 'Emelie',
    description: 'Nordic Wellness 2',
    coords: {
      latitude: 57.69906,
      longitude: 11.974119,
    },
  },
  {
    title: 'Sally',
    description: 'Nordic Wellness 3',
    coords: {
      latitude: 57.704691,
      longitude: 11.969216,
    },
  },
  {
    title: 'Glenn',
    description: 'Nordic Wellness 4',
    coords: {
      latitude: 57.704079,
      longitude: 11.959517,
    },
  },
];

function Map({ region }) {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      region={region}
      customMapStyle={mapStyle}
      showsMyLocationButton
      showsUserLocation
    >
      {places &&
        places.map((place, i) => (
          <Marker key={i} title={place.name} coordinate={place.coords} />
        ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
