import React, {useEffect, useState} from 'react';
import {FlatList, HStack, Image, VStack, Text, Box} from 'native-base';
import {
  Animated,
  Dimensions,
  LogBox,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {API_URL, KJ_URL} from '../config/const/url';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-banner-carousel';
import {NavigationContainer} from '@react-navigation/native';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

const images = [
  'https://koran-jakarta.com/images/article/dua-jenderal-bintang-empat-dan-sejumlah-jenderal-kompak-datang-ke-acara-yang-juga-dihadiri-kiai-berpengaruh-nu-211014144052.jpg',
  'https://koran-jakarta.com/images/article/proyek-kereta-cepat-jakarta-bandung-jadi-ajang-transfer-teknologi-211019003820.jpg',
  'https://koran-jakarta.com/images/article/indonesia-malaysia-bahas-pengakuan-bersama-sertifikat-vaksin-covid-19-211019001809.jpg',
];

const Home = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('render useEffect');
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    fetch(API_URL + 'article')
      .then(response => response.json())
      .then(res => {
        setData(res);
      })
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({item}) => {
    console.log('render flatlist');
    return (
      <HStack
        mx={3}
        borderBottomWidth="0.2"
        borderColor="gray.400"
        py={2}
        key={item.id}>
        <TouchableOpacity onPress={() => navigation.navigate('DetailArticle')}>
          <Image
            source={{
              uri: KJ_URL + item.image,
            }}
            borderRadius="sm"
            alt="Alternate Text"
            size="md"
          />
        </TouchableOpacity>
        <VStack
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: 'space-around',
          }}>
          <Text bold fontSize="xs" color="emerald.800">
            {item.category}
          </Text>
          <TouchableOpacity>
            <Text bold letterSpacing="sm">
              {item.title}
            </Text>
          </TouchableOpacity>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="xs" color="gray.500">
              {item.news_date}
            </Text>
            <TouchableOpacity>
              <Ionicons name="share-social-outline" size={18} />
            </TouchableOpacity>
          </HStack>
        </VStack>
      </HStack>
    );
  };

  const renderPage = (image, index) => {
    return (
      <Box key={index}>
        <Image
          style={{width: BannerWidth, height: 210}}
          source={{uri: image}}
          alt="niks"
          bg="red.800"
        />
        <VStack position="absolute" bottom={3} px={2}>
          <Text color="white" bold>
            Nasional
          </Text>
          <Text
            color="white"
            bold
            fontSize="xl"
            letterSpacing="sm"
            lineHeight="sm">
            Ini Dia, Salah Satu Jenderal Bintang Satu TNI AD Ini Ternyata Jago
            Tembak
          </Text>
        </VStack>
      </Box>
    );
  };

  return (
    <>
      <Carousel
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={BannerWidth}>
        {images.map((image, index) => renderPage(image, index))}
      </Carousel>
      <FlatList data={data} renderItem={renderItem} />
    </>
  );
};

export default Home;
