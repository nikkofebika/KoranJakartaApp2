import React, {useEffect, useState} from 'react';
import {
  FlatList,
  HStack,
  Image,
  VStack,
  Text,
  Box,
  Button,
  View,
  Divider,
} from 'native-base';
import {ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native';
import {API_URL, KJ_URL} from '../config/const/url';
import Carousel from 'react-native-banner-carousel';
import ArticleList from '../components/molecules/ArticleList';

const BannerWidth = Dimensions.get('window').width;

const images = [
  'https://koran-jakarta.com/images/article/dua-jenderal-bintang-empat-dan-sejumlah-jenderal-kompak-datang-ke-acara-yang-juga-dihadiri-kiai-berpengaruh-nu-211014144052.jpg',
  'https://koran-jakarta.com/images/article/proyek-kereta-cepat-jakarta-bandung-jadi-ajang-transfer-teknologi-211019003820.jpg',
  'https://koran-jakarta.com/images/article/indonesia-malaysia-bahas-pengakuan-bersama-sertifikat-vaksin-covid-19-211019001809.jpg',
];

const Home = ({navigation}) => {
  const [isEnd, setIsEnd] = useState(false);
  const [offset, setOffset] = useState(15);
  const [dataHeadline, setDataHeadline] = useState([]);
  const [articles, setArticles] = useState([]);
  const [topPopuler, setTopPopuler] = useState([]);

  useEffect(() => {
    console.log('render useEffect');
    fetchHeadline();
    fetchTopPopuler();
    fetchArticles();
  }, []);

  const fetchHeadline = () => {
    console.log('fetchHeadline');
    fetch(API_URL + 'article/headline')
      .then(response => response.json())
      .then(res => {
        setDataHeadline(res);
      })
      .catch(error => console.error(error));
  };

  const fetchTopPopuler = () => {
    console.log('fetchTopPopuler');
    fetch(API_URL + 'article/top_populer')
      .then(response => response.json())
      .then(res => {
        setTopPopuler(res);
      })
      .catch(error => console.error(error));
  };

  const fetchArticles = () => {
    console.log('fetchArticles');
    fetch(API_URL + 'article')
      .then(response => response.json())
      .then(res => {
        setArticles(res);
      })
      .catch(error => console.error(error));
  };

  const renderItem = ({item}) => {
    console.log('render flatlist');
    return (
      <>
        <ArticleList item={item} />
        <Divider borderBottomWidth="0.2" borderColor="gray.400" />
      </>
    );
  };

  const renderCarousel = (data, index) => {
    return (
      <Box key={index}>
        <Image
          style={{width: BannerWidth, height: 210}}
          source={{uri: KJ_URL + data.image}}
          alt="niks"
          bg="red.800"
        />
        <VStack position="absolute" bottom={3} px={2}>
          <Text color="white" bold>
            {data.category}
          </Text>
          <Text
            color="white"
            bold
            fontSize="xl"
            letterSpacing="sm"
            lineHeight="sm">
            {data.title}
          </Text>
        </VStack>
      </Box>
    );
  };

  return (
    <FlatList
      safeArea
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return (
          <VStack>
            <Carousel
              autoplay
              autoplayTimeout={5000}
              loop
              index={0}
              pageSize={BannerWidth}>
              {dataHeadline.map((data, index) => renderCarousel(data, index))}
            </Carousel>
            <VStack mx={3}>
              <Text bold fontSize="xl">
                Populer
              </Text>
              <Divider bg="red.700" my={0.5} />
              {topPopuler.map((item, index) => (
                <>
                  <ArticleList key={item.id} item={item} mx={0} />
                  {index < 4 && (
                    <Divider borderBottomWidth="0.2" borderColor="gray.400" />
                  )}
                </>
              ))}
            </VStack>
            <VStack mx={3}>
              <Text bold fontSize="xl">
                Terbaru
              </Text>
              <Divider bg="red.700" my={0.5} />
            </VStack>
          </VStack>
        );
      }}
      data={articles}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      onEndReached={() => {
        setIsEnd(true);
        fetch(API_URL + `article?offset=${offset}`)
          .then(response => response.json())
          .then(res => {
            setArticles([...articles, ...res]);
            setIsEnd(false);
            setOffset(offset + 15);
          })
          .catch(error => console.error(error));
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => {
        return isEnd ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null;
      }}
    />
  );
};

export default Home;
