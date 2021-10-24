import React, {useEffect, useState} from 'react';
import {
  FlatList,
  HStack,
  Image,
  VStack,
  Text,
  Box,
  Divider,
  ScrollView,
} from 'native-base';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {API_URL, KJ_URL} from '../config/const/url';
import Carousel from 'react-native-banner-carousel';
import ArticleList from '../components/molecules/ArticleList';
import LogoKJ from '../assets/logo/logokj.png';

const BannerWidth = Dimensions.get('window').width;
const Home = ({navigation}) => {
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [offset, setOffset] = useState(15);
  const [dataHeadline, setDataHeadline] = useState([]);
  const [articles, setArticles] = useState([]);
  const [topPopuler, setTopPopuler] = useState([]);
  const [dataHighlight, setDataHighlight] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <HStack
            px={3}
            py={1}
            alignItems="center"
            justifyContent="space-between">
            <Image source={LogoKJ} alt="Koran Jakarta" />
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search" size={25} />
            </TouchableOpacity>
          </HStack>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    console.log('render useEffect');
    fetchHeadline();
    fetchTopPopuler();
    fetchHighlight();
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

  const fetchHighlight = () => {
    console.log('fetchHighlight');
    fetch(API_URL + 'highlight')
      .then(response => response.json())
      .then(res => {
        setDataHighlight(res);
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

  const Page = ({label}) => (
    <View style={styles.container}>
      <Text style={styles.welcome}>{label}</Text>
      <Text style={styles.instructions}>To get started, edit index.ios.js</Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu
      </Text>
    </View>
  );

  return (
    <FlatList
      safeArea
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return (
          <VStack>
            <View style={[styles.container, {paddingTop: 20}]}>
              <ScrollableTabView
                tabBarActiveTextColor="#53ac49"
                renderTabBar={() => <TabBar underlineColor="#53ac49" />}>
                <Page tabLabel={{label: 'Page #1'}} label="Page #1" />
                <Page
                  tabLabel={{label: 'Page #2 aka Long!', badge: 3}}
                  label="Page #2 aka Long!"
                />
                <Page tabLabel={{label: 'Page #3'}} label="Page #3" />
                <Page
                  tabLabel={{label: 'Page #4 aka Page'}}
                  label="Page #4 aka Page"
                />
                <Page tabLabel={{label: 'Page #5'}} label="Page #5" />
              </ScrollableTabView>
            </View>
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
                <Box key={item.id}>
                  <ArticleList item={item} mx={0} />
                  {index < 4 && (
                    <Divider borderBottomWidth="0.2" borderColor="gray.400" />
                  )}
                </Box>
              ))}
            </VStack>
            <VStack mx={3}>
              <Text bold fontSize="xl">
                Highlight
              </Text>
              <Divider bg="red.700" my={0.5} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                my={2}>
                {dataHighlight.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('Highlight', {
                        highlight_id: item.id,
                        highlight_title: item.title,
                        highlight_seo_title: item.seo_title,
                        highlight_image: KJ_URL + item.image,
                        highlight_description: item.description,
                      })
                    }>
                    <Image
                      source={{
                        uri: KJ_URL + item.image,
                      }}
                      borderRadius="sm"
                      alt="Foto Berita"
                      height={200}
                      width={150}
                      mr={2}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 28,
  },
});
export default Home;
