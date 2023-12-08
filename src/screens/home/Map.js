import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { getBrandmap } from '../../services/api';
import { useEffect, useState } from 'react';

export default function App() {
  const [brandmap, setBrandmap] = useState(null);

  useEffect(() => {
    getBrandmap().then((brand) => {
      console.log('Brandmap Data:', brand);
      setBrandmap(brand.length > 0 ? brand[0] : null);
    }).catch((error) => {
      console.error('Error fetching brandmap:', error);
    });
  }, []);

  if (!brandmap) {
    // Loading state or error handling can be added here
    return null;
  }

  const initialRegion = {
    latitude: brandmap.latitude,
    longitude: brandmap.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const markerCoordinate = {
    latitude: brandmap.latitude,
    longitude: brandmap.longitude,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}r
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* Marker */}
        <Marker
          coordinate={markerCoordinate}
          title={brandmap.brandName}
          description={brandmap.avmName}
        />
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{brandmap.avmName}</Text>
        <Text style={styles.adress}>{brandmap.adress}</Text>
        <Text style={styles.phone}>{brandmap.phone}</Text>
        <Text style={styles.openTime}>{brandmap.openTime}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: 'rgba(30, 144, 255, 0.8)',
    width: 'auto',
    height: 160,
    padding: 8,
    margin: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    gap: 8,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  adress: {
    color: 'white',
    fontSize: 18,
  },
  phone: {
    color: 'white',
    fontSize: 16,
  },
  openTime: {
    color: 'white',
    fontSize: 16,
  },
});
