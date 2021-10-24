import {HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {KJ_URL} from '../../config/const/url';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShareButton from './ShareButton';
import {useNavigation} from '@react-navigation/core';

const ArticleList = props => {
  const navigation = useNavigation();
  return (
    <HStack mx={props.mx == 0 ? 0 : 3} py={2}>
      <TouchableOpacity
        onPress={() =>
          navigation.push('DetailArticle', {
            article_id: props.item.id,
            title: props.item.title,
            seo_title: props.item.seo_title,
            id_category: props.item.id_category,
            category: props.item.category,
          })
        }>
        <Image
          source={{
            uri: KJ_URL + props.item.image,
          }}
          borderRadius="sm"
          alt="Foto Berita"
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
          {props.item.category}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.push('DetailArticle', {
              article_id: props.item.id,
              title: props.item.title,
              seo_title: props.item.seo_title,
              id_category: props.item.id_category,
              category: props.item.category,
            })
          }>
          <Text bold letterSpacing="sm">
            {props.item.title}
          </Text>
        </TouchableOpacity>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" color="gray.500">
            {props.item.news_date}
          </Text>
          <ShareButton
            title={props.item.title}
            message={props.item.title + ' ' + KJ_URL + props.item.seo_title}
            url={KJ_URL + props.item.seo_title}
          />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ArticleList;
