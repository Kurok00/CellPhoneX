import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import CreateProduct from './src/screens/CreateProduct';
import Cart from './src/screens/Cart';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartProvider, useCart } from './src/screens/CartData';
import Login from './src/screens/Authenticator/Login';
import Signup from './src/screens/Authenticator/Signup';

// Tạo các navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Icon giỏ hàng
const CartIcon = () => {
  const { cartCount } = useCart();
  return (
    <View>
      <Icon name="cart-outline" size={24} color="#FFFFFF" />
      {cartCount > 0 && (
        <Text style={{ position: 'absolute', right: -10, top: -10, color: '#FFAA00' }}>{cartCount}</Text>
      )}
    </View>
  );
};

// Tạo stack cho sản phẩm
const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Chi tiết sản phẩm' }} />
    </Stack.Navigator>
  );
};

// Tạo stack cho xác thực
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true, title: 'Đăng ký' }} />
    </Stack.Navigator>
  );
};

// Component chính của ứng dụng
const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};

// Tab navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#FFAA00',
        tabBarInactiveTintColor: '#FFFFFF',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={ProductStack} 
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={24} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Create" 
        component={CreateProduct} 
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle-outline" size={24} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{
          tabBarIcon: () => <CartIcon />,
        }} 
      />
    </Tab.Navigator>
  );
};

export default App;