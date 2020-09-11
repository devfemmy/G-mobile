import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import DrawerNav from './Navigation/DrawerNav';
import { Provider } from './Context/context';
import LoginPage from './Screens/Login';

// const fetchFonts = () => {
//   Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  
//   });
// };

export default function App() {

  // const [fontLoaded, setFontLoaded] = useState(false);
  // if (!fontLoaded) {
  //   return <AppLoading 
  //   startAsync= {fetchFonts} 
  //   onFinish= {() => setFontLoaded(true)} />
  // }
  return (
    <>
  
      <DrawerNav/>
     
   
   
    </>
  );

}

