import { FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from './CategoryHomeSlice'; // CategoryHomeSlice'ı doğru yoldan içe aktardığınızdan emin olun

const CategoryHome = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryhome.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity key={item.id}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 24) / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    marginHorizontal: 6,
    marginVertical: -15,
    resizeMode: 'contain',
  },
});

export default CategoryHome;
