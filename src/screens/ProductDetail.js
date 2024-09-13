import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useCart } from './CartData';

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://66c6b6d58b2c10445bc77345.mockapi.io/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      // Alert.alert('Thông báo', `${product.name} đã được thêm vào giỏ hàng!`);
    }
  };

  if (!product) {
    return <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.priceContainer}>
        {product.sale_price && (
          <Text style={styles.salePrice}>{product.sale_price}đ</Text>
        )}
        <Text style={styles.productPrice}>{product.price}đ</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Mô tả sản phẩm:</Text>
        <Text style={styles.description}>{product.description || "Mô tả không có sẵn."}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  productImage: {
    width: '100%',
    height: 200, // Giảm chiều cao hình ảnh
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginVertical: 20, // Thay đổi để tạo khoảng cách từ trên và dưới
    resizeMode: 'contain', // Đảm bảo hình ảnh không bị cắt
},
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    margin: 16,
  },
  priceContainer: {
    flexDirection: 'column', // Đặt giá và giá giảm theo cột
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFAA00',
  },
  salePrice: {
    fontSize: 20,
    color: '#FFFFFF',
    textDecorationLine: 'line-through',
  },
  descriptionContainer: {
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFAA00',
    marginBottom: 8,
  },
  description: {
    color: '#FFFFFF',
    lineHeight: 20,
  },
  addToCartButton: {
    backgroundColor: '#FFAA00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  buttonText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductDetail;