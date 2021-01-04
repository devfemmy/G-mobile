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

const CartNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
        <Stack.Screen name="MyCart" component={Cart}
          options={{ title: 'My Cart', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent= {CustomHeaderButton}>
              <Item title= "Menu"
                iconName= "ios-menu"
                onPress= {() => {props.navigation.openDrawer();}} />
            </HeaderButtons>
          ), 
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }}
          />
          <Stack.Screen name="Address" component={AddAddress}
          options={{ title: 'Add Address', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }}
          />
        <Stack.Screen name="Wishlist" component={Wishlist}
          options={{ title: 'Wishlists', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          // headerLeft: null,
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }}
          />
          <Stack.Screen name="Checkout" component={Checkout}
          options={{ title: 'Checkout', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }}
          />
        <Stack.Screen name="ItemDisplay" component={ViewCatalog}
          options={
            ({ route }) => ({ title: route.params.name, 
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
      
                },
                headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
            })
        //     { title: 'Item Display', 
          
        // }
    
        }
          />
        <Stack.Screen name="Product" component={SingleItem}
          options={
            ({ route }) => ({ title: route.params.name, 
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
      
                },
                headerRight: () => (
                  <HeaderButtons HeaderButtonComponent= {CustomHeaderButton}>
                    <Item title= "Menu"
                      iconName= "ios-cart"
                      onPress= {() => {props.navigation.navigate('Cart')}} />
                  </HeaderButtons>
                ), 
                headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
            })
    
        }
          />
        </Stack.Navigator>
      </>
    )
}


export default CartNavigator;