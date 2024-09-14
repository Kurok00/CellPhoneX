import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#1E1E1E',
      marginTop: 30
    },
    logo: {
      width: 200,
      height: 150,
      alignSelf: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      color: '#FFFFFF',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#B0B0B0',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#2A2A2A',
      color: '#FFFFFF',
    },
    button: {
      backgroundColor: '#FFAA00',
      borderRadius: 8,
      alignItems: 'center',
      padding: 15,
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    signupText: {
      color: '#B0B0B0',
      marginTop: 15,
      textAlign: 'center',
    },
    signupLink: {
      color: '#FFAA00',
      fontWeight: 'bold',
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
      top: 15,
    },
    modalContent: {
      backgroundColor: '#2A2A2A',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      color: '#FFFFFF',
      fontSize: 18,
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: '#FFAA00',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      width: 60,
      alignItems:'center',
    },
    modalButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    questionButton: {
        marginTop: 20,
        alignItems: 'center',
      },
      bugContainer: {
        width: 50, // Kích thước của bug
        height: 50,
        borderRadius: 25, // Hình tròn
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'purple', // Màu nền bug
        justifyContent: 'center',
        alignItems: 'center',
      },
      bugText: {
        fontSize: 24,
        color: 'white', // Màu chữ bug
      },
    
  });

  export default styles;