import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import { Platform, Button } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/HeaderButton';
import ProfilePage from '../../Screens/Profile/Profile';
import NotificationPage from '../../Screens/Others/Notification';
import ViewNotification from '../../Screens/Others/ViewNotification';

const Stack = createStackNavigator();

const NotificationNavigator = (props) => {
    return (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Notification" component={NotificationPage}
          options={{ title: 'Notification', headerStyle: {
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
        <Stack.Screen name="Display" options={{ title: 'Read Notification', headerStyle: {
               backgroundColor: Platform.OS === 'android' ? 'white' : 'white',

          },
          headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
        }} component={ViewNotification} />
        </Stack.Navigator>
      </>
    )
}


export default NotificationNavigator;