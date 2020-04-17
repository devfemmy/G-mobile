import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import { Platform, Button } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import Home from '../../Screens/Home/home';
import ForgotPassword from '../../Screens/ForgotPassword';
import LoginPage from '../../Screens/Login';

const Stack = createStackNavigator();

const LoginNavigator = (props) => {
    return (
        <>
        <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
          <Stack.Screen name="Login" component={LoginPage}
          options={{ title: 'Login', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
    
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }}
          />
        <Stack.Screen name="ForgotPass" options={{ title: 'Forgot Password', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',

          },
          headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
        }} component={ForgotPassword} />
        </Stack.Navigator>
      </>
    )
}


export default LoginNavigator;