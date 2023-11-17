import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { storage } from '../../services/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect } from 'react';

const MyWalletHopiPay = () => {
  const [hopiPayImageUrl, setHopiPayImageUrl] = useState('')
  const [hopiPayButtonImageUrl, setHopiPayButtonImageUrl] = useState('')

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const buttonWidthRatio = 0.39;
  const buttonHeightRatio = 0.06;
  const buttonLeftRatio = 0.10;
  const buttonTopRatio = 0.24;

  useEffect(() => {
    const storageRef = ref(storage, 'screen/HopipayCard.png');

    getDownloadURL(storageRef)
      .then((url) => {
        setHopiPayImageUrl(url);
      })
      .catch((error) => {
        console.error('Resmi alma hatası:', error);
      });

      const storageRefButton = ref(storage, 'screen/button.jpg');

    getDownloadURL(storageRefButton)
      .then((url) => {
        setHopiPayButtonImageUrl(url);
      })
      .catch((error) => {
        console.error('Resmi alma hatası:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.hopipay}>
        <Image style={styles.hopipayImage} source={{uri: hopiPayImageUrl}} />
      </View>
      <TouchableOpacity
        style={{
          ...styles.hopipayButton,
          width: windowWidth * buttonWidthRatio,
          height: windowHeight * buttonHeightRatio,
          left: windowWidth * buttonLeftRatio,
          top: windowHeight * buttonTopRatio,
        }}
      >
        <Image style={styles.hopipayButtonImage} source={{uri: hopiPayButtonImageUrl}} />
      </TouchableOpacity>
    </View>
  )
}

export default MyWalletHopiPay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  hopipay: {
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  hopipayImage: {
    width: '100%',
    height: '84%',
    resizeMode: 'stretch',
    borderRadius: 28,
  },
  hopipayButton: {
    position: 'absolute',
    borderRadius: 12,
  },
  hopipayButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 12,
  },
})
