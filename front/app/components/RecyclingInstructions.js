import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';

const SERVER_URL = 'http://192.168.1.4:3000/items';

const fetchItems = async () => {
    try {
        const response = await axios.get(SERVER_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching the data', error);
    }
    return [];
};

const RecyclingInstructions = ({ navigation }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const initializeItems = async () => {
            const fetchedItems = await fetchItems();
            setItems(fetchedItems);
        };
        initializeItems();
    }, []);

    const handleItemPress = item => {
        navigation.navigate('RecyclingDetail', { item });
    };

    return (
        <View style={styles.container}>
            {items.map(item => (
                <ItemCard key={item.id} item={item} onPress={handleItemPress} />
            ))}
        </View>
    );
};

const ItemCard = ({ item, onPress }) => (
    <Pressable
        onPress={() => onPress(item)}
        style={({ pressed }) => [
            styles.itemCard,
            pressed ? styles.itemCardPressed : null
        ]}
    >
        <Text style={styles.itemIcon}>{item.icon}</Text>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemIndicator}>*</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
    },
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 3,
    },
    itemText: {
        fontSize: 16,
    },
    itemIndicator: {
        color: '#aaa',
    },
});

export default RecyclingInstructions;
