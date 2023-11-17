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
import { getShoppingMiddleCarousel } from '../services/api';

const {width: screenWidth} = Dimensions.get('window');

const MyShoppingCarousel = props => {
    const [images, setImage] = useState([])
    const carouselRef = useRef(null);

    useEffect(() => {
      getShoppingMiddleCarousel().then((images) => {
        setImage(images);
      });
    }, []);
  
    const renderItem = ({item, index}, parallaxProps) => {
      return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
          <ParallaxImage
            source={{uri: item.url}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          {/* <Text  numberOfLines={2}>
            {item.title}
          </Text> */}
        </View>
      );
    };
  
    return (
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
    );
}

export default MyShoppingCarousel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 50,
        backgroundColor: '#ffffff',
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
      title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
      }
})