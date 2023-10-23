import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

/**
 * Display an image and allow user to initiate an analysis of the image.
 * @param {Object} props - Component properties.
 * @param {Object} props.route - Navigation route object.
 * @param {Object} props.navigation - Navigation object.
 */
const ImageDisplay = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [items, setItems] = useState([]);

  const labelToItemNameMap = {
    "boxes": "플라스틱",
    "glass bottles": "유리",
    "soda cans": "캔",
    "crushed soda cans": "캔",
    "water bottles": "플라스틱"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.4:3000/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isCapturing || items.length === 0 || !route.params.imageUri) return;

    setIsCapturing(true);
    uploadImage();
  }, [items, route.params.imageUri]);

  const mapLabelToItem = (label) => {
    const itemName = labelToItemNameMap[label];
    return items.find(item => item.name === itemName);
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append('image', {
      uri: route.params.imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post('http://192.168.1.4:3000/upload', formData, {
        timeout: 30000,
        headers: { "Content-Type": "multipart/form-data" }
      });

      const { data } = response.data;
      if (data?.file) {
        console.log("File path:", data.file);
      }
      if (data?.predictedLabel) {
        const predictedItem = mapLabelToItem(data.predictedLabel);
        if (predictedItem) {
          navigation.navigate('RecyclingDetail', { item: predictedItem });
        }
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: route.params.imageUri }} style={styles.image} resizeMode="contain" />
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>다시 찍기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecyclingInstructions')}>
          <Text style={styles.buttonText}>분석 정보 확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '90%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
export default ImageDisplay;