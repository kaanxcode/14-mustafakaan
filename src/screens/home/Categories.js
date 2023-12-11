import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CategoryHome from "./CategoryHome";
import CategoryBrand from "./CategoryBrand";
import Map from "./Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Categories = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "black",
          tabBarShowIcon: true,
          tabBarPressColor: "#ffffff",
          tabBarIndicatorStyle: {
            backgroundColor: "#e81f89",
            height: "80%",
            borderRadius: 30,
            marginBottom: 4,
            marginLeft: 12,
            width: "45%",
          },
          tabBarStyle: {
            backgroundColor: "#ffffff",
            elevation: 0,
            marginTop: 14,
            height: "6%",
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen
          name="CategoryHome"
          component={CategoryHome}
          options={{
            tabBarLabel: t("categories.firstTabTitle"),
          }}
        />
        <Tab.Screen
          name="CategoryBrand"
          component={CategoryBrand}
          options={{
            tabBarLabel: t("categories.secondTabTitle"),
          }}
        />
      </Tab.Navigator>
      {/* <Stack.Navigator>
    <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator> */}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
