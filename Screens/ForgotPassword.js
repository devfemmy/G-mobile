import React, {useState} from 'react';
import {View, Text, StyleSheet,Dimensions, Image, TextInput, TouchableWithoutFeedback, 
    Keyboard, ScrollView, SafeAreaView, ImageBackground, KeyboardAvoidingView} from 'react-native';
import CustomButton from '../Components/button';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomBtn from '../Components/CustomBtn';



const ForgotPassword = ({navigation}) => {
    const [value, onChangeText] = useState('');
    const keyboardClose = () => {
        Keyboard.dismiss()
    }
    const windowHeight = Dimensions.get('window').height;
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            // backgroundColor: '#D1181F',
            margin: '8%'
        },
        imageBack: {
            width: Dimensions.get('window').width,
            minHeight: windowHeight,
            // maxHeight: Dimensions.get('window').height,
            // height: 250,
            resizeMode: 'cover'
        },
        inputContainer: {
            marginVertical: 20
        },
        btnTextStyle: {
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            marginVertical: 15
        },
        backContainer: {
            marginVertical: 10,
            alignItems: 'flex-start'
        },
        textSyle: {
            color: 'white',
            fontSize: 35,
            fontWeight: 'bold'
        },
        inputStyle: {
          color: 'white',
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          padding: 10,
          marginVertical: 5,
          
          
        },
        textSyle2: {
            color: 'white',
            fontSize: 15,
            marginVertical: 7,
            opacity: 0.7
        },
        imageContainer: {
            width: '100%',
            marginVertical: 50
        },
        imageStyle: {
            borderRadius: 10,
            width: '100%',
            height: 80
        },
        loginContainer: {
            flex: 1,
            marginVertical: 15
        },
        btnContainer: {
            marginVertical: 10
        }
    })
    return (
        
        <ImageBackground source= {require('../assets/password.png')} style= {styles.imageBack}>
        <KeyboardAvoidingView behavior= {Platform.OS == 'ios' ? "padding" : "height"} style = {styles.screen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* <TouchableWithoutFeedback onPress= {keyboardClose}> */}
        <ScrollView>
        <View style= {styles.backContainer}>
        <HeaderButtons HeaderButtonComponent= {CustomBtn}>
              <Item title= "Back"
                iconName= "ios-arrow-round-back"
                onPress={() => navigation.goBack()} />
        </HeaderButtons>
        </View>
  
            <View style= {styles.imageContainer}>
            <Image 
            style= {styles.imageStyle}
            source={require('../assets/logo.png')} />
            </View>

            <View style= {styles.loginContainer}>
                <Text style= {styles.textSyle}>Forgot Password</Text>
                <View style= {styles.inputContainer}>
               <TextInput style= {styles.inputStyle} 
                    placeholder= "Email Address" 
                    placeholderTextColor= "silver"
                    selectionColor = 'white'
                    inlineImageLeft = "username"
                    autoCorrect= {false}
                    autoCapitalize= 'none'
                    onChangeText={text => onChangeText(text)}
                    value={value} />
               
                </View>

                <View style= {styles.btnContainer}>
                        <CustomButton
                        textColor = "black" 
                        bgColor= "white" 
                        name = "Reset Password" />
                </View>
      
 
            </View>


        </ScrollView>
        {/* </TouchableWithoutFeedback> */}
         </TouchableWithoutFeedback>   
        </KeyboardAvoidingView>

        </ImageBackground>

        


    )
}


export default ForgotPassword