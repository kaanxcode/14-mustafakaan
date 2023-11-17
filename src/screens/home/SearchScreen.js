import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MySearchBar from '../../components/MySearchBar'
import Products from '../../screens/home/Products'
import Campaigns from '../../screens/home/Campaigns'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { getCampaings, getProducts } from '../../services/api'
import { useNavigation } from '@react-navigation/native'

const Tab = createMaterialTopTabNavigator();

const SearchScreen = () => {
  const [searchWord, setSearchWord] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    if (initialLoad || searchWord) {
      getCampaings().then((campaigns) => {
        setCampaigns(campaigns);

        if (!searchWord) {
          setFilteredCampaigns([]);
          return;
        }
        const filteredCampaigns = campaigns.filter((campaign) =>
          campaign.title.toLowerCase().includes(searchWord.toLowerCase()) ||
          campaign.subtitle.toLowerCase().includes(searchWord.toLowerCase())
        );
        setFilteredCampaigns(filteredCampaigns);
      });

      getProducts().then((products) => {
        setProducts(products);

        if (!searchWord) {
          setFilteredProducts([]);
          return;
        }
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchWord.toLowerCase()) ||
          product.subtitle.toLowerCase().includes(searchWord.toLowerCase())
        );

        setFilteredProducts(filteredProducts);
      });

      setInitialLoad(false);
    }
  }, [searchWord, initialLoad]);

  const handleSearch = (text) => {
    setSearchWord(text);
    setInitialLoad(true);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
      <MySearchBar searchBarTitle="Marka, kampanya ve ürün ara" onSearch={handleSearch} />
      </View>
      
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
            height: '7%',
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
      <Tab.Screen
          name="Products"
          options={{
            tabBarLabel: 'Ürünler',
          }}
        >
          {() => <Products products={filteredProducts.length > 0 ? filteredProducts : products} />}
        </Tab.Screen>

        <Tab.Screen
          name="Campaigns"
          options={{
            tabBarLabel: 'Kampanyalar',
          }}
        >
          {() => <Campaigns campaigns={filteredCampaigns.length > 0 ? filteredCampaigns : campaigns} />}
        </Tab.Screen>
    </Tab.Navigator>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchBarContainer: {
    alignItems: 'center'
  }
})