import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const RecyclingItemDetail = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <ItemIcon icon={item.icon} />
            <ItemTitle title={item.name} />
            <ItemDescription description={item.description} />
            <ItemDisposalText disposal={item.disposal} />
            <BackButton onPress={() => navigation.goBack()} />
        </View>
    );
};

const ItemIcon = ({ icon }) => <Text style={styles.icon}>{icon}</Text>;

const ItemTitle = ({ title }) => <Text style={styles.title}>{title}</Text>;

const ItemDescription = ({ description }) => <Text style={styles.description}>{description}</Text>;

const ItemDisposalText = ({ disposal }) => <Text style={styles.disposal}>{disposal}</Text>;

const BackButton = ({ onPress }) => (
    <Pressable style={styles.backButton} onPress={onPress}>
        <Text style={styles.backButtonText}>돌아가기</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        padding: 20,
    },
    icon: {
        fontSize: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    disposal: {
        fontSize: 14,
        color: '#555',
        marginBottom: 40,
        textAlign: 'center',
    },
    backButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
    },
    backButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default RecyclingItemDetail;
