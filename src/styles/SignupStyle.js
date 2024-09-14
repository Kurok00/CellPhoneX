import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#1E1E1E',
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
    passwordContainer: {
      position: 'relative',
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
      top: 10,
      justifyContent: 'center',
      alignItems: 'center',
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
      color: '#FFFFFF',
      marginTop: 15,
      textAlign: 'center',
    },
    signupLink: {
      color: '#FFAA00',
      fontWeight: 'bold',
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
    modalText: {
      color: '#FFFFFF',
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButton: {
      backgroundColor: '#FFAA00',
      padding: 10,
      borderRadius: 8,
      width: '100%',
    },
    modalButtonText: {
      color: '#1E1E1E',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default styles;