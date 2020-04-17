import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import { Platform, Button } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import Home from '../../Screens/Home/home';
import ForgotPassword from '../../Screens/ForgotPassword';

const Stack = createStackNavigator();

const HomeNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}
          options={{ title: 'Home', headerStyle: {
              
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
          
              
              

          },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent= {CustomHeaderButton}>
              <Item title= "Menu"
                iconName= "ios-menu"
                onPress= {() => {props.navigation.openDrawer();}} />
            </HeaderButtons>

            // <Button
            //   onPress={() => alert('This is a button!')}
            //   title="Info"
            //   color="red"
            // />
          ), 
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


export default HomeNavigator;