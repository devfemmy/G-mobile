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

const Stack = createStackNavigator();

const CatalogNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Catalogue" component={Catalogue}
          options={{ title: 'Catalogue', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerRight: () => (
            <TouchableOpacity onPress= {() => props.navigation.navigate('Wishlist')}>
              <Image 
              style= {{width:25, height: 25, marginRight: 20}}
              source= {require('../../assets/fav.png')} />
            </TouchableOpacity>
          ),
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
        <Stack.Screen name="Wishlist" component={Wishlist}
          options={{ title: 'Wishlist', headerStyle: {
              backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          // headerLeft: null,
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }}
          />
          <Stack.Screen name="Cart" component={Cart}
          options={{ title: 'Cart', headerStyle: {
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
        //     { title: 'Item Display', 
          
        // }
    
        }
          />
        </Stack.Navigator>
      </>
    )
}


export default CatalogNavigator;