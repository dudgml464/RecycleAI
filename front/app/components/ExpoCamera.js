import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ExpoCamera = () => {
    // States
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [picture, setPicture] = useState();

    // Refs and navigation
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    // Effects
    useEffect(() => {
        const requestCameraPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        requestCameraPermission();
    }, []);

    // Handlers
    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            setPicture(data.uri);
            navigation.navigate('ImageDisplay', { imageUri: data.uri });
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            setPicture(result.assets[0].uri);
            navigation.navigate('ImageDisplay', { imageUri: result.assets[0].uri });
        }
    };

    // Render
    if (hasPermission === null) return <View />;
    if (hasPermission === false) return <Text>카메라 접근 권한이 없습니다.</Text>;

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.controlContainer}>
                    <TouchableOpacity onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)} style={styles.button}>
                        <Icon name="camera-reverse-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePicture} style={[styles.button, styles.captureButton]}>
                        <Icon name="camera" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage} style={styles.button}>
                        <Icon name="images-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    controlContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingVertical: 25,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    button: {
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureButton: {
        backgroundColor: 'rgba(255,255,255,0.5)', 
        padding: 15,
        borderRadius: 50,
    }
});

export default ExpoCamera;
