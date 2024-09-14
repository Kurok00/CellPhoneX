import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Modal } from 'react-native';
import { signup } from '../../mockapi';
import styles from '../../styles/SignupStyle';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [passwordMismatchModalVisible, setPasswordMismatchModalVisible] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorModalVisible(true); // Hiện modal lỗi nếu thông tin không đầy đủ
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatchModalVisible(true); // Hiện modal nếu mật khẩu không khớp
      return;
    }

    try {
      await signup(email, password);
      setModalVisible(true); // Hiện modal khi đăng ký thành công
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng ký.');
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const closePasswordMismatchModal = () => {
    setPasswordMismatchModalVisible(false);
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
          <Text>{secureTextEntry ? '🙈🙈' : '👁️👁️'}</Text>
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
          <Text>{secureTextEntryConfirm ? '🙈🙈' : '👁️👁️'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Have an account already? <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>Sign in</Text>
      </Text>

      {/* Modal thông báo thành công */}
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đăng ký thành công!</Text>
            <Text style={styles.modalText}>Bạn có thể đăng nhập ngay bây giờ.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal thông báo lỗi */}
      <Modal transparent={true} animationType="slide" visible={errorModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thông báo</Text>
            <Text style={styles.modalText}>Vui lòng điền đầy đủ thông tin.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeErrorModal}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal thông báo mật khẩu không khớp */}
      <Modal transparent={true} animationType="slide" visible={passwordMismatchModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lỗi</Text>
            <Text style={styles.modalText}>Mật khẩu không khớp. Vui lòng kiểm tra lại.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closePasswordMismatchModal}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default Signup;