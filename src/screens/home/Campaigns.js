import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../services/firebase';
import MyCard from '../../components/MyCard';
import { AntDesign } from '@expo/vector-icons';
import { getCampaings, getFilteredCampaigns } from '../../services/api';
import ModalButton from '../../components/ModalButton';

const Campaigns = ({ campaigns }) => {
  const [imageUrl, setimageUrl] = useState('')
  const [modalFilterOpen, setFilterModalOpen] = useState(false)
  const [myCampaigns, setMyCampaigns] = useState([]);

  const uniqueBrandNames = [...new Set(campaigns.map(campaign => campaign.brandName))];
  
  useEffect(() => {
    const storageRef = ref(storage, 'icons/filter.png');

    getDownloadURL(storageRef)
      .then((url) => {
        setimageUrl(url);
      })
      .catch((error) => {
        console.error('Resmi alma hatası:', error);
      });
  }, []);

  useEffect(() => {
    setMyCampaigns(campaigns);
  }, [campaigns]);

  const handleBrandFilter = (brand) => {
    setFilterModalOpen(false);
    return getFilteredCampaigns(brand).then((campaigns) => {
      setMyCampaigns(campaigns);
    });
  };
  const clearCampaignFilter = () => {
    setFilterModalOpen(false);
    return getCampaings().then((campaigns) => {
      setMyCampaigns(campaigns);
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Modal visible={modalFilterOpen} animationType='slide'>
        <View>
          <AntDesign 
            name="close" 
            size={24} 
            color="black"
            style={styles.modalToggle}
            onPress={() => setFilterModalOpen(false)}
            />
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Filtrele</Text>
              <TouchableOpacity 
              style={styles.clearFilterButton}
              onPress={() => clearCampaignFilter()}>
                <Text style={{ color: 'darkgray' }}>Temizle</Text>
              </TouchableOpacity>
            </View>
            {uniqueBrandNames.map((brandName, index) => (
              <ModalButton
                key={index}
                text={brandName}
                isArrow={true}
                onPress={() => handleBrandFilter(brandName)}
              />
            ))}
        </View>
      </Modal>

      <View style={styles.campaignAndCountText}>
        <Text style={styles.campaingText}>{myCampaigns.length} Kampanya</Text>
        <TouchableOpacity style={styles.filterContainer} onPress={() => setFilterModalOpen(true)}>
          <Text style={styles.filterText}>Filtrele</Text>
          <Image
              style={styles.image}
              source={{ uri: imageUrl || 'https://firebasestorage.googleapis.com/v0/b/sedatkurtuldu-6c2a7.appspot.com/o/icons%2Ffilter.png?alt=media&token=0822b28b-86a6-4965-bae3-4a391c3fbf0c' }}
          />
        </TouchableOpacity>
      </View>
      <View style= {styles.cardDirection}>
        {myCampaigns.map((campaign) => (
            <MyCard
              key={campaign.id}
              url={campaign.image}
              description={campaign.title}
              chance={campaign.subtitle}
            />
        ))}
        </View>
    </ScrollView>
  )
}

export default Campaigns

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  campaignAndCountText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    paddingVertical: 20,
  },
  campaingText: {
    marginHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginRight: 8,
  },
  image: {
    width: 25,
    height: 25,
  },
  cardDirection: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  modalToggle:{
    alignSelf:"flex-end",
    marginHorizontal: '4%'
  },
  modalTitleContainer: {
    marginTop: '10%',
    marginBottom: '8%',
    marginHorizontal: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalTitle:{
    fontWeight: 'bold',
    fontSize: 28
  }
});
