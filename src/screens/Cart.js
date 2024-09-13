import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from './CartData';

const Cart = ({ navigation }) => {
  const { cart, removeFromCart, updateQuantity, setCart, setCartCount } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

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
    if (cart.length === 0) {
      setErrorModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const confirmCheckout = () => {
    setCart([]);
    setCartCount(0);
    setModalVisible(false);
  };

  const cancelCheckout = () => {
    setModalVisible(false);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.sale_price) * item.quantity);
    }, 0);
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
              <Text style={styles.itemPrice}>
                {parseFloat(item.sale_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleDecrease(item)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncrease(item)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.totalPrice}>
                Tổng giá: {(parseFloat(item.sale_price) * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </Text>
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
        <Text style={styles.checkoutButtonText}>
          Thanh toán ({calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })})
        </Text>
      </TouchableOpacity>

      {/* Modal thanh toán */}
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác nhận thanh toán</Text>
            <Text style={styles.modalText}>Bạn có chắc chắn muốn thanh toán?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={cancelCheckout}>
                <Text style={styles.modalButtonText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={confirmCheckout}>
                <Text style={styles.modalButtonText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal thông báo lỗi khi giỏ hàng rỗng */}
      <Modal transparent={true} animationType="slide" visible={errorModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="alert-circle-outline" size={50} color="#FFAA00" />
            <Text style={styles.modalTitle}>Có cái gì đâu mà thanh toán?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeErrorModal}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  totalPrice: {
    color: '#FFAA00',
    fontWeight: 'bold',
    marginTop: 8,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    maxWidth: 400,
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
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FFAA00',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  modalButtonText: {
    color: '#1E1E1E',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;