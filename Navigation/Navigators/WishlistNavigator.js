import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import { Platform, Button, Image } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import Catalogue from '../../Screens/Catalogue/Catalogue';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Wishlist from '../../Screens/Catalogue/Wishlist';
import ViewCatalog from '../../Screens/Catalogue/ViewCatalogue';
import SingleItem from '../../Screens/Catalogue/SingleItem';
import Cart from '../../Screens/Catalogue/Cart';
import AddAddress from '../../Screens/Catalogue/addAddress';
import ShippingAddress from '../../Screens/Catalogue/ShippingAddress';
import Checkout from '../../Screens/Catalogue/Checkout';

const Stack = createStackNavigator();

const WishListNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
        <Stack.Screen name="Wishlist" component={Wishlist}
          options={{ title: 'Wishlists', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent= {CustomHeaderButton}>
              <Item title= "Menu"
                iconName= "ios-menu"
                onPress= {() => {props.navigation.openDrawer();}} />
            </HeaderButtons>
          ), 
          // headerLeft: null,
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }}
          />
        </Stack.Navigator>
      </>
    )
}


export default WishListNavigator;