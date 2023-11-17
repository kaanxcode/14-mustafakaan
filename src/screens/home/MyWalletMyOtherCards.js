import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { getDownloadURL, ref } from 'firebase/storage';
import { useState } from 'react';
import { useEffect } from 'react';
import { storage } from '../../services/firebase';

const MyWalletMyOtherCards = () => {
  const [myCards, setMyCards] = useState('')

  useEffect(() => {
    const storageRef = ref(storage, 'screen/istanbulkart.jpg');

    getDownloadURL(storageRef)
      .then((url) => {
        setMyCards(url);
      })
      .catch((error) => {
        console.error('Resmi alma hatası:', error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.image}>
        <Image style={styles.istanbulkartImage} source={{uri: myCards}} />
      </TouchableOpacity>
    </View>
  )
}

export default MyWalletMyOtherCards

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image:{
    marginHorizontal: 10,
    marginVertical: 10
  },
  istanbulkartImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'stretch',
    borderRadius: 12,
  }
})