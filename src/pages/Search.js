import React, {useRef, useState} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import IllustrationSearch from '../assets/images/illustration_search.svg';
import {API_URL} from '../config/const/url';
import ArticleList from '../components/molecules/ArticleList';
import {Box, Divider, FlatList, Icon, Input, Text} from 'native-base';

const Search = () => {
  const lastQuery = useRef('');
  const [textNotFound, setTextNotFound] = useState(false);
  const [query, setQuery] = useState('');
  const [dataArticles, setDataArticles] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const handleSearch = () => {
    if (query !== '') {
      console.log('query = ' + query);
      console.log('lastQuery = ' + lastQuery.current);

      fetch(API_URL + `article/search?q=${query}&limit=15&offset=${offset}`)
        .then(response => response.json())
        .then(res => {
          console.log('res res', res);
          res.length > 0 ? setTextNotFound(false) : setTextNotFound(true);
          if (lastQuery.current != query) {
            setDataArticles(res);
          } else {
            setDataArticles(offset === 0 ? res : [...dataArticles, ...res]);
          }
          lastQuery.current = query;
          setIsEnd(false);
          setOffset(offset + 15);
        })
        .catch(error => console.error(error));
    } else {
      alert('search kosongggg');
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
        <ArticleList item={item} mx={0} />
        <Divider borderBottomWidth="0.2" borderColor="gray.400" />
      </>
    );
  };

  const deleteQuery = () => {
    setQuery('');
    lastQuery.current = '';
    dataArticles.length < 1 && setTextNotFound(false);
  };
  return (
    <Box mx={3}>
      <Input
        my={2}
        value={query}
        onChangeText={val => setQuery(val)}
        placeholder="Cari Berita..."
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        InputRightElement={
          query === '' ? (
            <TouchableOpacity>
              <Icon
                as={<Ionicons name="search" />}
                size={6}
                mr="2"
                color="muted.600"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={deleteQuery}>
              <Icon
                as={<Ionicons name="close" />}
                size={6}
                mr="2"
                color="muted.600"
              />
            </TouchableOpacity>
          )
        }
      />
      {dataArticles.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataArticles}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          onEndReached={() => {
            setIsEnd(true);
            handleSearch();
          }}
          onEndReachedThreshold={0.5}
          onRefresh={() => {
            setIsRefresh(true);
            fetch(API_URL + `article/search?q=${query}&limit=15`)
              .then(response => response.json())
              .then(res => {
                setIsRefresh(false);
                setDataArticles(res);
                setOffset(0);
              })
              .catch(error => console.error(error));
          }}
          refreshing={isRefresh}
          ListFooterComponent={() => {
            return isEnd ? (
              <ActivityIndicator color="black" style={{margin: 15}} />
            ) : null;
          }}
        />
      ) : (
        <Box
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
          }}>
          <Text style={{fontSize: 20, textAlign: 'center', marginTop: 15}}>
            {textNotFound
              ? 'Data tidak ditemukan. Silahkan masukkan kata kunci yang lain.'
              : 'Temukan berita terkini, terbaik dan terpercaya'}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Search;
