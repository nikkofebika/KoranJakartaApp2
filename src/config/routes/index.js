import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../pages/Home';
import Populer from '../../pages/Populer';
import Multimedia from '../../pages/Multimedia';
import Menu from '../../pages/Menu';
import DetailArticle from '../../pages/DetailArticle';
import Highlight from '../../pages/Highlight';
import Search from '../../pages/Search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="DetailArticle" component={DetailArticle} />
      <Stack.Screen name="Highlight" component={Highlight} />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Pencarian Berita',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Populer') {
            iconName = focused ? 'ios-star' : 'ios-star-outline';
          } else if (route.name === 'Multimedia') {
            iconName = focused ? 'ios-image' : 'ios-images-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'grid' : 'grid-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#03a87c',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Populer" component={Populer} />
      <Tab.Screen name="Multimedia" component={Multimedia} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}
