import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getShopping } from '../services/api';
import MyShoppingCarousel from './MyShoppingCarousel';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MyPaginatedCarousel = () => {

    const [shoppings, setShoppings] = useState([]);

    useEffect(() => {
        getShopping().then((shoppings) => {
            setShoppings(shoppings);
        });
    }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={[styles.carouselItem, { height: screenHeight * 0.87 }]}>
      <Image style={styles.carouselImage} source={{ uri: item.url }} />
      <View style={styles.texts}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
        <View style={styles.textBorder}></View>
        {item.price == 'Daha Fazla Gör >' ? <TouchableOpacity><Text style={styles.priceButton}>{item.price}</Text></TouchableOpacity> : <Text style={styles.priceText}>{item.price} ₺</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={shoppings}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout={'tinder'}
        onSnapToItem={(index) => setActiveIndex(index)}
        loop={true}
        autoplay={true}
        autoplayInterval={4000}
        ref={carouselRef}
      />
      <Pagination
        dotsLength={shoppings.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.pagination}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.inactiveDot}
      />
    </View>
    
  );
};

export default MyPaginatedCarousel;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textBorder: {
    borderWidth: 0.2, 
    width: '100%',
    borderColor: '#C1C1C1',
    backgroundColor: '#C1C1C1',
    marginVertical: 12
  },
  carouselItem: {
    width: screenWidth,
    backgroundColor: '#ffffff',
  },
  carouselImage: {
    width: screenWidth,
    height: screenHeight * 0.67,
    resizeMode:'stretch'
  },
  pagination: {
    position: 'absolute',
    top: 520,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  texts: {
    marginHorizontal: '5%',
    marginVertical: '3%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  priceButton:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  priceText:{
    fontSize: 20,
    fontWeight: 'bold'
  }
});
