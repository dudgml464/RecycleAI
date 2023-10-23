import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(50))[0];

  useEffect(() => {
      Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: 0, duration: 2000, useNativeDriver: true })
      ]).start(() => navigation.navigate('Home'));
  }, [navigation]);

  return (
      <View style={styles.splashContainer}>
          <Animated.Text style={{ ...styles.splashText, opacity: fadeAnim, transform: [{ translateY }] }}>
              RecycleAI
          </Animated.Text>
      </View>
  );
};

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50'
    },
    splashText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
});

export default SplashScreen;