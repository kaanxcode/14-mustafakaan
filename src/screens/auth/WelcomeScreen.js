// WelcomeScreen.jsx

import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImageUrl, selectImageUrl, selectStatus, selectError } from './WelcomeScreenSlice';

import MyWelcomeScreenButton from '../../components/MyWelcomeScreenButton';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const imageUrl = useSelector(selectImageUrl);
  const status = useSelector(selectStatus);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchImageUrl());
  }, [dispatch]);

  const navigateToEmail = () => {
    navigation.navigate('EmailScreen');
  };

  return (
    <View style={styles.container}>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'failed' && <Text>Error: {error}</Text>}
      {status === 'succeeded' && imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
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
