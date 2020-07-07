import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import { Platform, Button } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import ForgotPassword from '../../Screens/ForgotPassword';
import MyCard from '../../Screens/Card/card';
import QrCodeScreen from '../../Screens/Card/qrcode';
import BarCodeScreen from '../../Screens/Card/barcodeScreen';

const Stack = createStackNavigator();

const CardNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Card" component={MyCard}
          options={{ title: 'My Card', headerStyle: {
              
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
        <Stack.Screen name="Qrcode" options={{ title: 'QR Code', headerStyle: {
               backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }} component={QrCodeScreen} />
        <Stack.Screen name="Barcode" options={{ title: 'Bar Code', headerStyle: {
               backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }} component={BarCodeScreen} />
        </Stack.Navigator>
      </>
    )
}


export default CardNavigator;