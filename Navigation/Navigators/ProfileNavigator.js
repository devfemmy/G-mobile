import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import { Platform, Button } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import ProfilePage from '../../Screens/Profile/Profile';

const Stack = createStackNavigator();

const ProfileNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Profile" component={ProfilePage}
          options={{ title: 'Profile', headerStyle: {
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
        </Stack.Navigator>
      </>
    )
}


export default ProfileNavigator;