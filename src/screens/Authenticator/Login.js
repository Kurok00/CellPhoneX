import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { login } from '../../mockapi';
import styles from '../../styles/LoginStyle';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoginHackModalVisible, setLoginHackModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [answer, setAnswer] = useState('');

  const handleLogin = async () => {
    // Kiểm tra xem email và password có để trống không
    if (!email.trim() || !password.trim()) {
      setModalMessage('Email và mật khẩu không được để trống.');
      setModalVisible(true);
      return;
    }

    try {
      const user = await login(email, password);
      if (user) {
        navigation.navigate('Main'); // Điều hướng đến màn hình chính
      } else {
        setModalMessage('Email hoặc mật khẩu không đúng.');
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage('Có lỗi xảy ra trong quá trình đăng nhập.');
      setModalVisible(true);
      console.error(error);
    }
  };

  const handleQuestionSubmit = () => {
    const trimmedAnswer = answer.trim().toLowerCase();

    if (trimmedAnswer === '') {
      setModalMessage('Câu trả lời không đúng. Bạn là Cali ?');
      setModalVisible(true);
    } else if (trimmedAnswer === 'việt nam' || trimmedAnswer === 'vn'  || trimmedAnswer === 'viet nam'  || trimmedAnswer === 'vietnam' ) {
      setLoginHackModalVisible(false); // Đóng modal đăng nhập hack
      setAnswer(''); // Xóa câu trả lời sau khi gửi thành công
      navigation.navigate('Main');
    } else {
      setModalMessage('Câu trả lời không đúng. Bạn là Cali ?');
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setAnswer(''); // Xóa câu trả lời khi đóng modal
    setLoginHackModalVisible(false);
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
          <Text>{secureTextEntry ? '🙈🙈' : '👁️👁️'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
      </Text>

      {/* Nút Bug Màu Tím */}
      <TouchableOpacity style={styles.questionButton} onPress={() => setLoginHackModalVisible(true)}>
        <View style={styles.bugContainer}>
          <Text style={styles.bugText}>🐞</Text>
        </View>
      </TouchableOpacity>

      {/* Modal cho thông báo lỗi */}
      <Modal isVisible={modalMessage !== ''} onBackdropPress={() => setModalMessage('')}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', marginBottom: 10 }}>
            {modalMessage}
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalMessage('')}>
            <Text style={styles.modalButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal cho câu hỏi đăng nhập hack */}
      <Modal isVisible={isLoginHackModalVisible}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', marginBottom: 10 }}>
            Chào mừng đến đăng nhập trực tiếp !!!
          </Text>
          <Text style={{ fontSize: 18, color: 'yellow', textAlign: 'center', marginBottom: 15 }}>
            Trả lời câu hỏi sau để xác định bạn không phải là Cali 3 sọc :))
          </Text>
          <Text style={styles.modalText}>Hoàng Sa, Trường Sa là của ... ?</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập câu trả lời"
            value={answer}
            onChangeText={setAnswer}
            placeholderTextColor="#B0B0B0"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleQuestionSubmit}>
            <Text style={styles.modalButtonText}>Gửi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
            <Text style={styles.modalButtonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Login;