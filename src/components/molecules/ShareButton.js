import React from 'react';
import {TouchableOpacity, Share} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShareButton = ({title, message, url, size = 16, style}) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={() => Share.share({title, message, url})}>
      <Ionicons name="share-social-outline" size={size} />
    </TouchableOpacity>
  );
};
export default ShareButton;
