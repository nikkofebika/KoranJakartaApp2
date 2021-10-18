import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Box, NativeBaseProvider, Text} from 'native-base';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
          <Text>Open up App.js to start working on your app!</Text>
        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
