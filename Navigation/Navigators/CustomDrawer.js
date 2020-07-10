import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
  import {Avatar, Title, Caption, Paragraph,
  Drawer, TouchableRipple, Switch} from 'react-native-paper'
import { AuthContext } from '../DrawerNav';
import { Text, StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

  function CustomDrawerContent(props) {
    const { signOut} = React.useContext(AuthContext);
    return (
                <DrawerContentScrollView {...props}>
                <View style={{height: 90,alignItems: 'center', justifyContent: 'center'}}>
                  <Image style= {styles.imageHeight} source= {require('./../../assets/logo.png')} />
                  {/* <Text style={{fontSize: 32}}>LO</Text> */}
                  </View>
            <DrawerItemList {...props} />
          
            <DrawerItem
              icon= {({color, size}) => (
                <Icon name= "exit-to-app"
                color= "white"
                size= {22}
                />
              )}
              label="Log Out"
              labelStyle={styles.textColor}
              
              
            
              
              onPress={() => signOut()}
            />
          </DrawerContentScrollView>


    );
  }
  const styles = StyleSheet.create({
      textColor : {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18
      },
      imageHeight: {
        width: '80%',
        height: 40
      }
  })

  export default CustomDrawerContent;