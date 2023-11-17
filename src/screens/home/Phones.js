import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getPhones } from '../../services/api';
import MyShoppingCard from '../../components/MyShoppingCard';
import { Dimensions } from 'react-native';

const Phones = () => {
  const [cards, setCards] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth * cards.length;
  
  useEffect(() => {
    getPhones().then((data) => {
      setCards(data);
    });
  }, []);

  const renderCard = ({ item }) => {
    return (
      <MyShoppingCard
        key={item.id}
        description={item.description}
        url={item.url}
        price={item.price}
        type={item.type}
        title={item.title}
        denemeWidth={screenWidth}
      />
    );
  };

  return (
    <View style={styles.container}>
        <FlatList
          data={cards}
          horizontal={true}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{  width: itemWidth * 0.51 }}
        />
    </View>
  );
};

export default Phones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
