// src/screens/Authenticator/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { signup } from '../../mockapi';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp. Vui lòng kiểm tra lại.');
      return;
    }

    try {
      await signup(email, password);
      Alert.alert('Đăng ký thành công!', 'Bạn có thể đăng nhập ngay bây giờ.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng ký.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sign up to CellPhone X</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#B0B0B0"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#B0B0B0"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Text>{secureTextEntry ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={secureTextEntryConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#B0B0B0"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureTextEntryConfirm(!secureTextEntryConfirm)}>
          <Text>{secureTextEntryConfirm ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Have an account already? <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>Sign in</Text>
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
});

export default Signup;