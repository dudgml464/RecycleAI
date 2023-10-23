import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Animated, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const fadeAnim = useState(new Animated.Value(0))[0];
    const scale = useState(new Animated.Value(0.8))[0];

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, tension: 50, friction: 4, useNativeDriver: true })
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Text style={{ ...styles.homeText, opacity: fadeAnim, transform: [{ scale }] }}>RecycleAI</Animated.Text>
            <Animated.View style={{ ...styles.buttonView, opacity: fadeAnim, transform: [{ scale }] }}>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.pressableButton} onPress={() => navigation.navigate('Camera')}>
                        <Text style={styles.buttonText}>분석 시작</Text>
                    </Pressable>
                    <Pressable style={styles.pressableButton} onPress={() => navigation.navigate('RecyclingGuide')}>
                        <Text style={styles.buttonText}>분리수거 가이드 보기</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        padding: 20
    },
    homeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 100
    },
    buttonView: {
        width: '100%'
    },
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 50
    },
    pressableButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});

export default HomeScreen;