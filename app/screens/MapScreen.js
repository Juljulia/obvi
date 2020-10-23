import React from 'react';
import { StyleSheet, View } from 'react-native';

import Map from '../components/Map';
import Screen from '../components/Screen';

function MapScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.container}>
        <Map style={styles.map}></Map>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default MapScreen;
