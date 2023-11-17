import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyWelcomeScreenButton from '../../components/MyWelcomeScreenButton'
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const storageRef = ref(storage, 'screen/HosgeldinEkrani.png');

    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Resmi alma hatası:', error);
      });
  }, []);

  const navigateToEmail = () => {
    navigation.navigate('EmailScreen');
  };

  return (
    <View style={styles.container}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <MyWelcomeScreenButton buttonText='GİRİŞ YAP' onPress={navigateToEmail} arrow={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default WelcomeScreen;