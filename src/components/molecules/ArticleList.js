import {HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {KJ_URL} from '../../config/const/url';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ArticleList = props => {
  return (
    <HStack mx={props.mx == 0 ? 0 : 3} py={2}>
      <TouchableOpacity onPress={() => navigation.navigate('DetailArticle')}>
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
        <TouchableOpacity>
          <Text bold letterSpacing="sm">
            {props.item.title}
          </Text>
        </TouchableOpacity>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" color="gray.500">
            {props.item.news_date}
          </Text>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={18} />
          </TouchableOpacity>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ArticleList;
