import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MyWelcomeScreenButton from '../../components/MyWelcomeScreenButton'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../services/firebase';
import { useState } from 'react';

const EmailScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const navigateToPassword = () => {
      navigation.navigate('PasswordScreen', { email });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Eposta Adresi</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>Eposta adresini girerek başlayabilirsin</Text>
      </View>
      <View style={styles.textInputContainer}>
      <TextInput
          style={styles.textInput}
          placeholder="E-posta adresinizi girin"
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.horizontalLine} />
      <MyWelcomeScreenButton buttonText='DEVAM' onPress={navigateToPassword} arrow={true} />
    </View>
  )
}

export default EmailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    marginTop: 30,
  },
  headerText: {
    fontSize: 36,
  },
  description: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 24,
  },
  textInputContainer: {
    marginTop: 20,
  },
  textInput: {
    fontSize: 18,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
  },
})
