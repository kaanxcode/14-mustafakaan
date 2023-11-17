import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyWalletHopiPay from './MyWalletHopiPay';
import MyWalletMyCards from './MyWalletMyCards';
import MyWalletMyOtherCards from './MyWalletMyOtherCards';
import MyWalletCard from '../../components/MyWalletCard';

const Tab = createMaterialTopTabNavigator();

const MyWallet = () => {
  return (
    <View style={styles.container}>
     
      <MyWalletCard />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: 'black',
          tabBarShowIcon: true,
          tabBarPressColor: '#ffffff',
          tabBarIndicatorStyle: {
            backgroundColor: '#39b34a',
            height: '80%',
            borderRadius: 30,
            marginBottom: 4,
            marginLeft: 6,
            width: '30%',
          },
          tabBarStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            marginTop: 50,
            height: '10%',
          },
          tabBarLabelStyle: {
            fontSize: 16,
            textTransform: 'capitalize',
          },
        })}
      >
     <Tab.Screen name="MyWalletHopiPay" component={MyWalletHopiPay} 
       options={{
        tabBarLabel: 'Hopipay',
        
       }}
      
      />
      <Tab.Screen name="MyWalletMyCards" component={MyWalletMyCards} 
      options={{
        tabBarLabel: 'Kartlarım',
        
       }}
      />
      <Tab.Screen name="MyWalletMyOtherCards" component={MyWalletMyOtherCards} 
      options={{
        tabBarLabel: 'Diğer Kartlarım',
        
       }}
      />
    </Tab.Navigator>



    </View>
  )
}

export default MyWallet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
})
