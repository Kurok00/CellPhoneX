import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CreateProduct = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [image, setImage] = useState(null);

  const handleAddProduct = async () => {
    if (!name || !price || !salePrice || !image) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin sản phẩm.');
      return;
    }

    const newProduct = {
      name,
      price,
      sale_price: salePrice,
      image,
    };

    try {
      const response = await fetch('https://66c6b6d58b2c10445bc77345.mockapi.io/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        Alert.alert('Thông báo', 'Sản phẩm đã được thêm thành công!');
        navigation.goBack();
      } else {
        Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Thông báo', 'Bạn cần cấp quyền truy cập hình ảnh!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Sản Phẩm Mới</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên sản phẩm"
        placeholderTextColor="#B0B0B0"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá sản phẩm"
        keyboardType="numeric"
        placeholderTextColor="#B0B0B0"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá khuyến mãi"
        keyboardType="numeric"
        placeholderTextColor="#B0B0B0"
        value={salePrice}
        onChangeText={setSalePrice}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Chọn hình ảnh từ album</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1E1E1E',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    backgroundColor: '#2A2A2A',
    marginBottom: 16,
  },
  imagePicker: {
    height: 150,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageText: {
    color: '#B0B0B0',
  },
  button: {
    backgroundColor: '#FFAA00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
});

export default CreateProduct;