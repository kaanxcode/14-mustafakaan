import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeRoutes from './HomeRoutes';
import AuthRoutes from './AuthRoutes';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth } from '../services/firebase';
import SearchScreen from '../screens/home/SearchScreen';
import { AntDesign } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();
const Router = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="HomeRoutes"
                        component={HomeRoutes} />
                ) : (
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="AuthRoutes"
                        component={AuthRoutes} />
                )}
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerTitle: 'Arama Yap',
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign name="left" size={24} color="black" />
                            </TouchableOpacity>
                        ),
                        headerStyle: {
                            backgroundColor: 'white',
                        },
                        headerShadowVisible: false,
                    })}
                    name="SearchScreen"
                    component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router

const styles = StyleSheet.create({})
