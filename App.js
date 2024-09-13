import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Thêm import này
import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail'; // Thêm import này
import CreateProduct from './src/screens/CreateProduct';
import Cart from './src/screens/Cart';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartProvider, useCart } from './src/screens/CartData';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Tạo stack navigator

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

// Tạo stack cho ProductList và ProductDetail
const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Chi tiết sản phẩm' }} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
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
            component={ProductStack} // Sử dụng ProductStack
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
      </CartProvider>
    </NavigationContainer>
  );
};

export default App;