import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useCart } from './CartData';
import styles from '../styles/ProductDetailStyle';

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

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0đ';
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
          <Text style={styles.Price}>Giá gốc: {formatPrice(product.price)}đ</Text>
        )}
        <Text style={styles.salePrice}>Giá Sale: {formatPrice(product.sale_price)}đ</Text>
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

export default ProductDetail;