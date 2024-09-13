// src/screens/Authenticator/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { login } from '../../mockapi';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      if (user) {
        Alert.alert('Đăng nhập thành công!', `Chào mừng, ${email}`);
        navigation.navigate('ProductList');
      } else {
        Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng nhập.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Log in to CellPhone X</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#B0B0B0"
      />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#B0B0B0"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Text>{secureTextEntry ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  logo: {
    width: 200, // Điều chỉnh kích thước theo ý muốn
    height: 150, // Điều chỉnh kích thước theo ý muốn
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
});

export default Login;