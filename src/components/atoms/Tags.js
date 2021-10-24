import React from 'react';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tags = ({id, title}) => {
  return (
    <Text
      style={{
        backgroundColor: '#059669',
        color: '#ffffff',
        flexWrap: 'wrap',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 3,
        marginRight: 5,
        marginTop: 5,
      }}>
      <Ionicons name="pricetag" /> {title}
    </Text>
  );
};

export default Tags;
