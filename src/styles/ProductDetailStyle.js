import { StyleSheet } from "react-native-web";

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
    Price: {
      fontSize: 20,
      fontWeight: 'bold',
      textDecorationLine: 'line-through',
      color: '#FFAA00',
    },
    salePrice: {
      fontSize: 26,
      color: 'red',
      
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

  export default styles