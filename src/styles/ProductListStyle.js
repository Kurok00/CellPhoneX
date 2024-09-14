import { StyleSheet } from "react-native-web";

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
      fontSize: 18,
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

  export default styles