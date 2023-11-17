import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingData } from './ShoppingSlice'; // ShoppingSlice'ı doğru yoldan içe aktardığınızdan emin olun
import MyPaginatedCarousel from '../../components/MyPaginatedCarousel';
import MyShoppingCarousel from '../../components/MyShoppingCarousel';
import ShoppingPhones from './ShoppingPhones';
import Phones from './Phones';
import AndroidPhones from './AndroidPhones';
import ApplePhones from './ApplePhones';

const Shopping = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShoppingData());
  }, [dispatch]);

  // Redux state'lerini alın
  const paginatedCarouselData = useSelector((state) => state.shopping.paginatedCarouselData);
  const shoppingCarouselData = useSelector((state) => state.shopping.shoppingCarouselData);
  const phonesData = useSelector((state) => state.shopping.phonesData);
  const androidPhonesData = useSelector((state) => state.shopping.androidPhonesData);
  const applePhonesData = useSelector((state) => state.shopping.applePhonesData);

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <MyPaginatedCarousel data={paginatedCarouselData} />
      <MyShoppingCarousel data={shoppingCarouselData} />
      <View>
        {/* <ShoppingPhones
          titleText={'Cep Telefonları Fırsatlarını Yakala'}
          firstTabName={'Phones'}
          secondTabName={'AndroidPhones'}
          thirdTabName={'ApplePhones'}
          firstTabLabel={'Cep Telefonları'}
          secondTabLabel={'Android Telefonlar'}
          thirdTabLabel={'Apple IOS Telefonlar'}
          firstTabComponent={Phones}
          secondTabComponent={AndroidPhones}
          thirdTabComponent={ApplePhones}
          data={{
            phonesData,
            androidPhonesData,
            applePhonesData,
          }}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});

export default Shopping;
