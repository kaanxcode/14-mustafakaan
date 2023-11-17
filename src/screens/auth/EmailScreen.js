// EmailScreen.jsx

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail, selectStatus, selectError } from './EmailSlice';
import MyWelcomeScreenButton from '../../components/MyWelcomeScreenButton';

const EmailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [email, setEmail] = useState('');

  const navigateToPassword = () => {
    dispatch(sendEmail(email));
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
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.horizontalLine} />
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'failed' && <Text>Error: {error}</Text>}
      <MyWelcomeScreenButton buttonText="DEVAM" onPress={navigateToPassword} arrow={true} />
    </View>
  );
};

export default EmailScreen;

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
});
