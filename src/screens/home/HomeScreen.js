import React, { useEffect, useState } from 'react'
import { Dimensions, View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import MyCard from '../../components/MyCard'
import { getBanners, getCampaings } from '../../services/api'
import MySearchBar from '../../components/MySearchBar'
import MyCarousel from '../../components/MyCarousel'
import Banner from '../../components/Banner'
import MySearchBarButton from '../../components/MySearchBarButton'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
 const navigation = useNavigation();
 const [cards, setCards] = useState([]);
 const [banners, setBanners] = useState([]);
  // useEffect(() => {
  //     getCards().then((cards) => {
  //       const campaignsCollection = collection(db, 'campaigns');
    
  //       cards.forEach((card) => {
  //         addDoc(campaignsCollection, {
  //           title: card.description,
  //           image: card.url,
  //           subtitle: card.chance,
  //         });
  //       });
  //     });
  //   }, []);

 useEffect(() => {
    getCampaings().then((cards) => {
      setCards(cards);
    });
    getBanners().then((banner) => {
      setBanners(banner);
    });
 }, []);


 const navigateToSearchScreen = () => {
  navigation.navigate('SearchScreen');
 }

 const navigateToCampaignsScreen = () => {
  navigation.navigate('SearchScreen', {
    screen: 'Campaigns',
  });
};


 return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <TouchableOpacity style={styles.searchBar} onPress={navigateToSearchScreen}>
        <MySearchBarButton searchBarTitle="Marka, kampanya ve ürün ara"/>
      </TouchableOpacity>
      <MyCarousel />
      <Text style={styles.middleText}>Hepsi Senin İçin</Text>
      <View style= {styles.cardDirection}>
      {cards.slice(0, 6).map((card, index) => (
          <React.Fragment key={card.id}>
            <MyCard
              url={card.image}
              description={card.title}
              chance={card.subtitle}
            />
            <View key={card.id}>
              {((index === 3 && banners[1]) || (index === 5 && banners[0])) && (
                <Banner imageUrl={banners[index === 3 ? 1 : 0].image} url={banners[index === 3 ? 1 : 0].url} />
              )}
            </View>
          </React.Fragment>
        ))}

      <TouchableOpacity 
      onPress={navigateToCampaignsScreen}
      style={styles.ImageContainer}>
        <Image
          style={styles.more}
          source={require('../../images/more.png')} />
        </TouchableOpacity>
      </View>
    </ScrollView>

 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 150,
    borderWidth: 1,
    borderColor: 'gray',
  },
  searchBar: {
      justifyContent: "center", 
      alignItems: "center", 
      marginVertical: 10
  },
  middleText: {
    marginLeft: '3%',
    fontWeight: 'bold',
    fontSize: 18
  },
  cardDirection: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  more:{
    width: Dimensions.get('window').width*0.5,
    justifyContent:"center",
    alignItems:"center",
    resizeMode: 'contain',
  },
  ImageContainer:{
    alignItems:'center',
    marginLeft:'25%'
  }
})

export default HomeScreen