import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
import { AuthContext } from '../DrawerNav';
import { Text, StyleSheet } from 'react-native';

  function CustomDrawerContent(props) {
    const { signOut} = React.useContext(AuthContext);
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
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
          fontWeight: 'bold'
      }
  })

  export default CustomDrawerContent;