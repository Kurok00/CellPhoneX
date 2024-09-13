import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CreateProduct = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const apiKey = '59214ae01d29f2e';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://66c6b6d58b2c10445bc77345.mockapi.io/products');
      const data = await response.json();
      const sortedData = data.sort((a, b) => b.id - a.id);
      setProducts(sortedData);
    } catch (error) {
      console.error(error);
      showAlert('Có lỗi xảy ra khi lấy sản phẩm.');
    }
  };

  const uploadImageToImgur = async (uri) => {
    const formData = new FormData();
    formData.append('image', {
      uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    try {
      const response = await fetch(`https://api.imgur.com/3/image`, {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.data.link;
    } catch (error) {
      console.error(error);
      showAlert('Có lỗi xảy ra khi tải ảnh lên Imgur.');
      return null;
    }
  };

  const handleAddProduct = async () => {
    if (!name || !price || !salePrice || !image || !description) {
      showAlert('Vui lòng điền đầy đủ thông tin sản phẩm.');
      return;
    }

    const newImageUri = await uploadImageToImgur(image);
    if (!newImageUri) return;

    const newProduct = {
      name,
      price: price.replace(/\./g, ''),
      sale_price: salePrice.replace(/\./g, ''),
      image: newImageUri,
      description,
    };

    try {
      const response = await fetch('https://66c6b6d58b2c10445bc77345.mockapi.io/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        fetchProducts();
        showAlert('Sản phẩm đã được thêm thành công!');
        resetForm();
        setModalVisible(false);
      } else {
        showAlert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      console.error(error);
      showAlert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const handleUpdateProduct = async () => {
    if (!currentProduct) return;

    const newImageUri = await uploadImageToImgur(image);
    if (!newImageUri) return;

    const updatedProduct = {
      name,
      price: price.replace(/\./g, ''),
      sale_price: salePrice.replace(/\./g, ''),
      image: newImageUri,
      description,
    };

    try {
      const response = await fetch(`https://66c6b6d58b2c10445bc77345.mockapi.io/products/${currentProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        fetchProducts();
        setModalVisible(false);
        resetForm();
        showAlert('Sản phẩm đã được cập nhật thành công!');
      } else {
        showAlert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      console.error(error);
      showAlert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://66c6b6d58b2c10445bc77345.mockapi.io/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
        showAlert('Sản phẩm đã được xóa thành công!');
      } else {
        showAlert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      console.error(error);
      showAlert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setSalePrice('');
    setDescription('');
    setImage(null);
    setCurrentProduct(null);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      showAlert('Bạn cần cấp quyền truy cập hình ảnh!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    setName(product.name);
    setPrice(product.price);
    setSalePrice(product.sale_price);
    setDescription(product.description);
    setImage(product.image);
    setModalVisible(true);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>
        Giá: {parseFloat(item.price.replace(/\./g, '')).toLocaleString()} VND
      </Text>
      <Text style={styles.salePrice}>
        Giá khuyến mãi: {parseFloat(item.sale_price.replace(/\./g, '')).toLocaleString()} VND
      </Text>
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => openUpdateModal(item)}
      >
        <Text style={styles.updateButtonText}>Cập nhật</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteProduct(item.id)}
      >
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Sản Phẩm</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>

      {/* Modal Nhập Thông Tin Sản Phẩm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          resetForm();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentProduct ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Mô tả sản phẩm"
              placeholderTextColor="#B0B0B0"
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Text style={styles.imageText}>Chọn hình ảnh từ album</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={currentProduct ? handleUpdateProduct : handleAddProduct}>
              <Text style={styles.buttonText}>{currentProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                resetForm();
              }}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Custom Alert */}
      {alertVisible && (
        <View style={styles.alertContainer}>
          <View style={styles.alertContent}>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => setAlertVisible(false)}>
              <Text style={styles.alertButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1E1E1E',
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
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
  },
  productName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  productPrice: {
    color: '#B0B0B0',
  },
  salePrice: {
    color: '#FFAA00',
  },
  imagePicker: {
    height: 120,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  alertContent: {
    width: '80%',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  alertMessage: {
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  alertButton: {
    backgroundColor: '#FFAA00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  alertButtonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  updateButtonText: {
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
    width: 65,
  },
  deleteButtonText: {
    color: '#FFFFFF',
  },
});

export default CreateProduct;