import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyPaginatedCarousel from '../../components/MyPaginatedCarousel'
import MyShoppingCarousel from '../../components/MyShoppingCarousel'
import ShoppingPhones from './ShoppingPhones'
import Phones from './Phones'
import AndroidPhones from './AndroidPhones'
import ApplePhones from './ApplePhones'

const Shopping = () => {
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.container}>
      <MyPaginatedCarousel />
      <MyShoppingCarousel/>
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
        /> */}
      </View>
      

    </ScrollView>
  )
}

export default Shopping

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  }
})