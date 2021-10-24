import React, {useEffect, useState} from 'react';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  Stack,
  ScrollView,
  VStack,
  Divider,
  Badge,
} from 'native-base';
import ShareButton from '../components/molecules/ShareButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {API_URL, KJ_URL} from '../config/const/url';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ArticleList from '../components/molecules/ArticleList';
import BigArticle from '../components/molecules/BigArticle';

const DetailArticle = ({route, navigation}) => {
  const {article_id, title, seo_title, category, id_category} = route.params;
  const [isLoading, setIsLoading] = useState({});
  const [article, setArticle] = useState({});
  const [relatedPost, setRelatedPost] = useState([]);
  const [topPopuler, setTopPopuler] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      title: category,
      headerRight: () => (
        <ShareButton
          title={title}
          message={title + ' ' + KJ_URL + seo_title}
          url={KJ_URL + seo_title}
          size={23}
          style={{marginRight: 10}}
        />
      ),
    });
    fetch(API_URL + 'article/get_by_id/' + article_id)
      .then(response => response.json())
      .then(res => {
        setArticle(res);
        setIsLoading(false);
      })
      .catch(error => console.error(error));

    fetch(
      API_URL +
        'article/get_relatedposts/' +
        article_id +
        '/' +
        id_category +
        '/6',
    )
      .then(response => response.json())
      .then(res => {
        setRelatedPost(res);
      })
      .catch(error => console.error(error));

    fetch(API_URL + `article/top_populer?category_id=${id_category}`)
      .then(response => response.json())
      .then(res => {
        setTopPopuler(res);
      })
      .catch(error => console.error(error));
  }, []);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box
        overflow="hidden"
        shadow={1}
        _light={{backgroundColor: 'white'}}
        _dark={{backgroundColor: 'gray.700'}}>
        <Box>
          <AspectRatio ratio={16 / 9}>
            <Image
              source={{
                uri: KJ_URL + article.image[0],
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="emerald.500:alpha.50"
            _text={{color: 'white', fontWeight: '700', fontSize: 'xs'}}
            position="absolute"
            bottom={0}
            px="3"
            py="1.5">
            {category}
          </Center>
        </Box>
        <Stack mx={3} space={3}>
          <Stack space={2}>
            <Text fontSize="xs" mt={2} color="gray.500" fontWeight="400">
              {article.news_date}
            </Text>
            <Heading size="md" color="black">
              {title}
            </Heading>
            {article.titlehead != '' && (
              <Text
                fontSize="xs"
                _light={{color: 'violet.500'}}
                _dark={{color: 'violet.300'}}
                fontWeight="500"
                mt="-1">
                {article.titlehead}
              </Text>
            )}
          </Stack>
          <Text fontWeight="400" textAlign="justify">
            {article.description}
          </Text>
          <Text bold mb={0}>
            Topik Terkait :
          </Text>
          <Box display="flex" flexDirection="row" flexWrap="wrap" mt={0}>
            {article.tags &&
              article.tags.map(tag => {
                return (
                  <TouchableOpacity
                    key={tag.id}
                    onPress={() =>
                      navigation.navigate('Topik', {
                        tag_id: tag.id,
                        tag_title: tag.tag,
                      })
                    }>
                    <Badge
                      colorScheme="success"
                      variant="solid"
                      flex={1}
                      flexDirection="row">
                      <Ionicons name="pricetag" color="white" /> {tag.tag}
                    </Badge>
                  </TouchableOpacity>
                );
              })}
          </Box>
          <VStack>
            <Text bold fontSize="xl">
              Berita Terkait
            </Text>
            <Divider bg="red.700" my={0.5} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              mt={1}>
              {relatedPost.map(item => {
                return <BigArticle key={item.id} article={item} mr={2} />;
              })}
            </ScrollView>
          </VStack>
          <VStack>
            <Text bold fontSize="xl">
              Populer di {category}
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
        </Stack>
      </Box>
    </ScrollView>
  );
};

export default DetailArticle;
