import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image, Alert, SafeAreaView } from 'react-native';
import { useCart } from './CartData';

const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://66c6b6d58b2c10445bc77345.mockapi.io/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Huỷ', style: 'cancel' },
      { text: 'Đăng xuất', onPress: () => navigation.navigate('Login') },
    ]);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    Alert.alert(`${product.name} đã được thêm vào giỏ hàng.`);
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
        <Text style={styles.welcomeText}>Welcome back, User!</Text>
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
        contentContainerStyle={styles.flatListContent}
      />
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
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
  },
  productImage: {
    width: 150,
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
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFAA00',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 16,
  },
});

export default ProductList;