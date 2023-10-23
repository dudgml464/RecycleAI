import React from 'react';
import ExpoCamera from '../components/ExpoCamera';
import ImageDisplay from '../components/ImageDisplay';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecyclingInstructions from '../components/RecyclingInstructions';
import RecyclingItemDetail from '../components/RecyclingItemDetail';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Camera" component={ExpoCamera} options={{ headerShown: false }} />
              <Stack.Screen name="ImageDisplay" component={ImageDisplay} />
              <Stack.Screen name="RecyclingGuide" component={RecyclingInstructions} />
              <Stack.Screen name="RecyclingDetail" component={RecyclingItemDetail} />
          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;