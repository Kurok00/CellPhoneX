import React, { useState } from 'react';
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
import styles from '../styles/ProductListStyle';
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

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0đ';
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
            <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
            {item.sale_price && (
              <Text style={styles.salePrice}>{formatPrice(item.sale_price)}</Text>
            )}
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



export default ProductList;