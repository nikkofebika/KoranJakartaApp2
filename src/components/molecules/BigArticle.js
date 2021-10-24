import React from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ShareButton from './ShareButton';
import {KJ_URL} from '../../config/const/url';
import {Box, Center, HStack, Image, Text, VStack} from 'native-base';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 1.5) / 2.4);
const BigArticle = ({article, mr}) => {
  const navigation = useNavigation();
  return (
    <VStack width={220} mr={mr}>
      <TouchableOpacity
        onPress={() =>
          navigation.push('DetailArticle', {
            article_id: article.id,
            title: article.title,
            id_category: article.id_category,
            category: article.category,
          })
        }>
        <Image
          source={{uri: KJ_URL + article.image}}
          alt="Koran Jakarta"
          height={170}
          borderRadius="sm"
        />
        <Center
          bg="emerald.500:alpha.50"
          _text={{color: 'white', fontWeight: '700', fontSize: 'xs'}}
          position="absolute"
          bottom={0}
          px="3"
          py="1.5">
          {article.category}
        </Center>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.push('DetailArticle', {
            article_id: article.id,
            title: article.title,
            id_category: article.id_category,
            category: article.category,
          })
        }>
        <Text bold lineHeight="sm">
          {article.title}
        </Text>
      </TouchableOpacity>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="2xs" color="gray.500" fontWeight="400">
          {article.news_date}
        </Text>
        <ShareButton
          title={article.title}
          message={article.title + ' ' + KJ_URL + article.seo_title}
          url={KJ_URL + article.seo_title}
        />
      </HStack>
    </VStack>
  );
};

export default BigArticle;
