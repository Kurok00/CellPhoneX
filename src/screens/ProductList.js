import React, { useState } from 'react';
import Login from '../screens/Authenticator/Login';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useCart } from './CartData';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const ProductList = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://66c6b6d58b2c10445bc77345.mockapi.io/products');
      const data = await response.json();
      const sortedData = data.sort((a, b) => b.id - a.id);
      setProducts(sortedData);
    } catch (error) {
      console.error(error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra khi lấy sản phẩm.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    navigation.navigate('Login');
    setModalVisible(false);
  };

  const cancelLogout = () => {
    setModalVisible(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome To CellPhone X!</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a product"
        placeholderTextColor="#B0B0B0"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <TouchableOpacity onPress={() => handleProductPress(item)}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
            </TouchableOpacity>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.salePrice}>{item.sale_price}</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.buttonText}>Mua</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        key={`${2}-${filteredProducts.length}`}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Modal Logout */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đăng xuất</Text>
            <Text style={styles.modalText}>Bạn có chắc chắn muốn đăng xuất?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={cancelLogout}>
                <Text style={styles.modalButtonText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={confirmLogout}>
                <Text style={styles.modalButtonText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  logoutText: {
    fontSize: 18,
    color: '#FFAA00',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    backgroundColor: '#2A2A2A',
    marginBottom: 16,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 10,
    margin: 8,
    alignItems: 'center',
    elevation: 3,
    minHeight: 300, // Đảm bảo chiều cao tối thiểu
    borderColor: '#FFAA00', // Đường viền màu vàng
    borderWidth: 2, // Độ dày của đường viền
  },
  productImage: {
    width: 130,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#FFAA00',
    textDecorationLine: 'line-through', // Đường gạch ngang
  },
  salePrice: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold', // Đậm để nổi bật
    marginTop: 4,
  },
  button: {
    backgroundColor: '#FFAA00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 8,
    width: '100%', // Chiếm toàn bộ chiều rộng
    alignItems: 'center',
  },
  buttonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền tối với độ trong suốt
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  modalText: {
    color: '#FFFFFF',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#FFAA00',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductList;