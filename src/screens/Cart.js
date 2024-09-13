import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from './CartData';

const Cart = ({ navigation }) => {
  const { cart, removeFromCart, updateQuantity, setCart, setCartCount } = useCart();

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleCheckout = () => {
    Alert.alert('Thông báo', 'Thanh toán thành công!', [
      {
        text: 'OK',
        onPress: () => {
          setCart([]); // Xóa toàn bộ giỏ hàng
          setCartCount(0); // Đặt lại số lượng giỏ hàng về 0
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.detailsContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.sale_price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleDecrease(item)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncrease(item)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                <Icon name="trash-outline" size={24} color="#FFAA00" />
                <Text style={styles.removeButtonText}> Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#1E1E1E',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 4,
  },
  itemPrice: {
    color: '#FFAA00',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: '#FFAA00',
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    color: '#1E1E1E',
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFAA00',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    marginTop: 8,
  },
  removeButtonText: {
    color: '#FFAA00',
    marginLeft: 4,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#FFAA00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  checkoutButtonText: {
    color: '#1E1E1E',
    fontSize: 18,
  },
});

export default Cart;