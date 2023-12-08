import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import MySearchBar from '../../components/MySearchBar'
import { getBrands } from '../../services/api';
import { useNavigation } from '@react-navigation/native';


const CategoryBrand = () => {
  const [brands, setBrands] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
      getBrands().then((brands) => {
          setBrands(brands);
      });
  }, []);

  const navigateToMap = () => {
    // Navigate to the 'Maps' screen
    navigation.navigate('Map');
  };

  const renderBrand = ({ item }) => (
    <TouchableOpacity key={item.id} 
    onPress={navigateToMap} >
        <Image
            source={{ uri: item.url }}
            style={styles.image}
        />
    </TouchableOpacity>
);


 return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MySearchBar searchBarTitle="Arama Yap" />
        <View style={styles.brandAndCountText}>
          <Text style={styles.brandText}>Markalar</Text>
          <Text style={styles.middleText}>{brands.length} Marka</Text>
        </View>
        <FlatList
            style={{ marginBottom: 72 }}
            data={brands}
            renderItem={renderBrand}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
 )
}

export default CategoryBrand

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 36) / 3;

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#ffffff',
 },
 searchBar: {
    justifyContent: "center", 
    alignItems: "center", 
    marginVertical: 10
 },
 brandAndCountText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    paddingVertical: 20
 },
 brandText: {
    fontWeight: 'bold',
    fontSize: 18,
 },
 image: {
  width: imageWidth,
  height: imageWidth,
  marginHorizontal: 6,
  marginVertical: 6,
  resizeMode: 'contain'
},
})