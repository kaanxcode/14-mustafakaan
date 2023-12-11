import React, { useEffect, useTransition } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MyCard from "../../components/MyCard";
import MySearchBar from "../../components/MySearchBar";
import MyCarousel from "../../components/MyCarousel";
import Banner from "../../components/Banner";
import MySearchBarButton from "../../components/MySearchBarButton";
import { useNavigation } from "@react-navigation/native";
import { fetchCampaigns, fetchBanners } from "./HomeScreenSlice"; // HomeScreenSlice'ı doğru yoldan içe aktardığınızdan emin olun
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Redux state'lerini alın
  const cards = useSelector((state) => state.homescreen.cards);
  const banners = useSelector((state) => state.homescreen.banners);

  useEffect(() => {
    // Redux async thunk'ları ile Firebase verilerini al
    dispatch(fetchCampaigns());
    // dispatch(fetchBanners());
  }, [dispatch]);

  const navigateToSearchScreen = () => {
    navigation.navigate("SearchScreen");
  };

  const navigateToCampaignsScreen = () => {
    navigation.navigate("SearchScreen", {
      screen: "Campaigns",
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <TouchableOpacity
        style={styles.searchBar}
        onPress={navigateToSearchScreen}
      >
        <MySearchBarButton searchBarTitle={t("home.searchBarTitle")} />
      </TouchableOpacity>
      <MyCarousel />
      <Text style={styles.middleText}>{t("home.bannersTitle")}</Text>
      <View style={styles.cardDirection}>
        {cards.slice(0, 6).map((card, index) => (
          <React.Fragment key={card.id}>
            <MyCard
              url={card.image}
              description={card.title}
              chance={card.subtitle}
            />
            <View key={card.id}>
              {((index === 3 && banners[1]) || (index === 5 && banners[0])) && (
                <Banner
                  imageUrl={banners[index === 3 ? 1 : 0].image}
                  url={banners[index === 3 ? 1 : 0].url}
                />
              )}
            </View>
          </React.Fragment>
        ))}
        <TouchableOpacity
          onPress={navigateToCampaignsScreen}
          style={styles.ImageContainer}
        >
          <View>
            <Text style={styles.more}>{t("home.showMoreText")}</Text>
          </View>
          <View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 150,
    borderWidth: 1,
    borderColor: "gray",
  },
  searchBar: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  middleText: {
    marginLeft: "3%",
    fontWeight: "bold",
    fontSize: 18,
  },
  cardDirection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  more: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    textAlign: "center",
    fontSize: 18,
  },
  ImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
    margin: 5,
    padding: 10,
    borderRadius: 15,
  },
});

export default HomeScreen;
