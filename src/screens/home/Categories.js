import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategoryHome from './CategoryHome';
import CategoryBrand from './CategoryBrand';

const Tab = createMaterialTopTabNavigator();
const Categories = () => {
  return (
  <View style={styles.container}>
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: 'black',
          tabBarShowIcon: true,
          tabBarPressColor: '#ffffff',
          tabBarIndicatorStyle: {
            backgroundColor: '#e81f89',
            height: '80%',
            borderRadius: 30,
            marginBottom: 4,
            marginLeft: 12,
            width: '45%',
          },
          tabBarStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            marginTop: 14,
            height: '6%',
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
      <Tab.Screen name="CategoryHome" component={CategoryHome} 
       options={{
        tabBarLabel: 'Kategoriler',
        
       }}
      
      />
      <Tab.Screen name="CategoryBrand" component={CategoryBrand} 
      options={{
        tabBarLabel: 'Markalar',
        
       }}
      />
    </Tab.Navigator>
  </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})