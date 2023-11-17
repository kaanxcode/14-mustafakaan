import { ImageBackground, SafeAreaView, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/home/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Categories from "../screens/home/Categories";
import Shopping from "../screens/home/Shopping";
import MyWallet from "../screens/home/MyWallet";
import SearchScreen from "../screens/home/SearchScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import { storage } from "../services/firebase";

const Tab = createBottomTabNavigator();

export default function HomeRoutes() {

  const [imageUrl, setimageUrl] = useState('')
  
  useEffect(() => {
    const storageRef = ref(storage, 'icons/hopi.png');

    getDownloadURL(storageRef)
      .then((url) => {
        setimageUrl(url);
      })
      .catch((error) => {
        console.error('Resmi alma hatası:', error);
      });
  }, []);

  return (
    
      <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarLabelStyle: {
          color: 'black',
        },
      })}
      >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
          
            options={{
              tabBarLabel: 'Kampanyalar',
              tabBarIcon: ({ focused }) => (
                <View style={styles.campaignTabIcons}>
                  <Ionicons name="ios-pricetag" size={24} color={focused ? '#e81f89' : 'black'}  />
                  <Ionicons style={{ right: 15}} name="ios-pricetag-outline" size={24} color={focused ? '#e81f89' : 'black'}  />
                </View>    
              ),
              headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10 }}>
                  <Ionicons style={styles.headerLeftIcon} name="ios-person-outline" size={20} color="black" />
                    <View style={styles.dot}>
                      <Text style={styles.dotNumber}>6</Text>
                    </View>
                </TouchableOpacity>
              ),
              headerTitle: () => (
                <TouchableOpacity style={styles.headerTitleIcon}>
                  <ImageBackground
                    source={{ uri: imageUrl }}
                    style={{ width: 103, height: 34 }}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={styles.headerRightIcons}>
                  <TouchableOpacity>
                    <Ionicons name="cart-sharp" size={28} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="qr-code" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              ),
              headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
              },
              headerTitleAlign: 'center',
              headerShadowVisible: false,
            }}


          />
      <Tab.Screen name="Categories" component={Categories}
       options={{
        tabBarLabel: 'Kategoriler',
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name="appstore-o"
            size={24}
            color={focused ? '#e81f89' : 'black'} 
          />
        ),
        headerLeft: () => (
          <TouchableOpacity style={{ paddingLeft: 10 }}>
            <Ionicons style={styles.headerLeftIcon} name="ios-person-outline" size={20} color="black" />
              <View style={styles.dot}>
                <Text style={styles.dotNumber}>6</Text>
              </View>
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <TouchableOpacity style={styles.headerTitleIcon}>
            <ImageBackground
              source={{ uri: imageUrl }}
              style={{ width: 103, height: 34 }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.headerRightIcons}>
            <TouchableOpacity>
              <Ionicons name="cart-sharp" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="qr-code" size={28} color="black" />
            </TouchableOpacity>
          </View>
        ),
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
      
      />
      <Tab.Screen name="Shopping" component={Shopping}
      options={{
        tabBarLabel: 'Alışveriş',
        tabBarIcon: ({ focused }) => (
          <MaterialIcons name="storefront" size={24} color={focused ? '#e81f89' : 'black'}  />
        ),
        headerLeft: () => (
          <TouchableOpacity style={{ paddingLeft: 10 }}>
            <Ionicons style={styles.headerLeftIcon} name="ios-person-outline" size={20} color="black" />
              <View style={styles.dot}>
                <Text style={styles.dotNumber}>6</Text>
              </View>
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <TouchableOpacity style={styles.headerTitleIcon}>
            <ImageBackground
              source={{ uri: imageUrl }}
              style={{ width: 103, height: 34 }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.headerRightIcons}>
            <TouchableOpacity>
              <Ionicons name="cart-sharp" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="qr-code" size={28} color="black" />
            </TouchableOpacity>
          </View>
        ),
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
      
      />
      <Tab.Screen name="MyWallet" component={MyWallet} 
      
      options={{
        tabBarLabel: 'Cüzdanım',
        tabBarIcon: ({ focused }) => (
          <Ionicons name="ios-wallet-outline" size={24} color={focused ? '#e81f89' : 'black'} />
        ),
        headerLeft: () => (
          <TouchableOpacity style={{ paddingLeft: 10 }}>
            <Ionicons style={styles.headerLeftIcon} name="ios-person-outline" size={20} color="black" />
              <View style={styles.dot}>
                <Text style={styles.dotNumber}>6</Text>
              </View>
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <TouchableOpacity style={styles.headerTitleIcon}>
            <ImageBackground
              source={{ uri: imageUrl }}
              style={{ width: 103, height: 34 }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.headerRightIcons}>
            <TouchableOpacity>
              <Ionicons name="cart-sharp" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="qr-code" size={28} color="black" />
            </TouchableOpacity>
          </View>
        ),
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
      
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleIcon: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  headerLeftIcon: {
    backgroundColor: '#F5F6F8',
    padding: 6 ,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: "#e81f89",
    width: 16,
    height: 16,
    borderRadius: 10,
    position: "absolute",
    right: -2,
    top: -1,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dotNumber: {
    color: "white",
    position: "absolute",
    right: 3,
    top: -2,
    fontSize: 12
  },
  headerRightIcons: {
    paddingRight: 10, 
    flex: 1, 
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16
    
  },
  campaignTabIcons: {
    flexDirection: "row",
  },
});
