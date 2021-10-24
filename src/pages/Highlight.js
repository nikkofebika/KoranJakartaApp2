import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  CheckIcon,
  Divider,
  FlatList,
  HStack,
  Image,
  Select,
  Text,
  VStack,
} from 'native-base';
import ShareButton from '../components/molecules/ShareButton';
import {API_URL, KJ_URL} from '../config/const/url';
import ArticleList from '../components/molecules/ArticleList';
import {ActivityIndicator} from 'react-native';

const Highlight = ({route, navigation}) => {
  const {
    highlight_id,
    highlight_title,
    highlight_seo_title,
    highlight_image,
    highlight_description,
  } = route.params;
  const [selectedSortBy, setSelectedSortBy] = useState('terbaru');
  const [dataArticles, setDataArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const fetchArticle = () => {
    fetch(
      API_URL +
        `highlight/articles/${highlight_id}?limit=15&offset=${offset}&order=${selectedSortBy}`,
    )
      .then(response => response.json())
      .then(res => {
        setTotalArticles(res.total_data);
        res.articles &&
          setDataArticles(
            offset === 0 ? res.articles : [...dataArticles, ...res.articles],
          );
        setIsEnd(false);
        setOffset(offset + 15);
      })
      .catch(error => console.error(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ShareButton
          title={highlight_title}
          message={
            highlight_title + ' ' + KJ_URL + 'lipsus/' + highlight_seo_title
          }
          url={KJ_URL + 'lipsus/' + highlight_seo_title}
          size={23}
          style={{marginRight: 10}}
        />
      ),
    });
  }, []);

  useEffect(() => {
    fetchArticle();
  }, [offset, selectedSortBy]);

  const handleLoadMore = () => {
    setIsEnd(true);
  };

  const renderItem = ({item}) => (
    <>
      <ArticleList item={item} mx={0} />
      <Divider borderBottomWidth="0.2" borderColor="gray.400" />
    </>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      mx={3}
      ListHeaderComponent={() => (
        <VStack>
          <HStack my={1}>
            <Image
              source={{
                uri: highlight_image,
              }}
              borderRadius="sm"
              alt="Foto Berita"
              height={150}
              width={120}
              mr={2}
            />
            <Text fontWeight="extrabold" fontSize="lg">
              {highlight_title}
            </Text>
          </HStack>
          <Text textAlign="justify" lineHeight="sm">
            {highlight_description}
          </Text>
          <HStack alignItems="center" justifyContent="space-between">
            <Text
              bold
              fontSize="lg"
              borderLeftWidth={4}
              borderLeftColor="red.800">
              {totalArticles} Konten
            </Text>
            <Select
              selectedValue={selectedSortBy}
              minWidth="120"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: 'teal.300',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setSelectedSortBy(itemValue)}>
              <Select.Item label="Terbaru" value="terbaru" />
              <Select.Item label="Terpopuler" value="terpopuler" />
              <Select.Item label="Terlama" value="terlama" />
            </Select>
          </HStack>
        </VStack>
      )}
      data={dataArticles}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      onRefresh={() => {
        setIsRefresh(true);
        fetch(
          API_URL +
            `highlight/articles/${highlight_id}?limit=15&order=${selectedSortBy}`,
        )
          .then(response => response.json())
          .then(res => {
            setIsRefresh(false);
            setTotalArticles(res.total_data);
            res.articles && setDataArticles(res.articles);
            setOffset(0);
          })
          .catch(error => console.error(error));
      }}
      refreshing={isRefresh}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => {
        return isEnd ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null;
      }}
    />
  );
};

export default Highlight;
