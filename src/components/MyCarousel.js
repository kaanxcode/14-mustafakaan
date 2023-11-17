import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { getOffers } from '../services/api';

const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = () => {
  const [images, setImage] = useState([])
  const carouselRef = useRef(null);
  // useEffect(() => {
  //   getOffers().then((images) => {
  //     const offersCollection = collection(db, 'offers');
  
  //     images.forEach((image) => {
  //       addDoc(offersCollection, {
  //         description: image.description,
  //         url: image.url,
  //         title: image.title,
  //       });
  //     });
  //   });
  // }, []);

  useEffect(() => {
    getOffers().then((images) => {
      setImage(images);
    });
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.url}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    // <View style={styles.container}>
    <>
    <View>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={images}
        renderItem={renderItem}
        hasParallaxImages={true}
        firstItem={2}
        autoplay={true} 
        autoplayInterval={4000}
        loop={true}
      />
    </View>
    </>
      
    // </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 50
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 160,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
