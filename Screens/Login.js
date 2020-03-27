import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, SafeAreaView} from 'react-native';
import CustomButton from '../Components/button';

const LoginPage = () => {
    const [value, onChangeText] = useState('');
    const [password, onChangePassword] = useState('');
    const keyboardClose = () => {
        Keyboard.dismiss()
    }
    return (
        <ScrollView style = {styles.screen}>
            <SafeAreaView>
            <TouchableWithoutFeedback onPress= {keyboardClose}>
        <View>
            <View style= {styles.imageContainer}>
            <Image 
            style= {styles.imageStyle}
            source={require('../assets/logo.png')} />
            </View>

            <View style= {styles.loginContainer}>
                <Text style= {styles.textSyle}>Login</Text>
                <Text style= {styles.textSyle2}>Login to your Grandsquare Account</Text>
                <View style= {styles.inputContainer}>
               <TextInput style= {styles.inputStyle} 
                    placeholder= "Username" 
                    placeholderTextColor= "grey"
                    selectionColor = 'white'
                    inlineImageLeft = "username"
                    autoCorrect= {false}
                    autoCapitalize= 'none'
                    onChangeText={text => onChangeText(text)}
                    value={value} />
                    <TextInput style= {styles.inputStyle} 
                    placeholder= "Password" 
                    placeholderTextColor= "grey"
                    selectionColor = 'white'
                    inlineImageLeft = "username"
                    secureTextEntry
                    autoCorrect= {false}
                    autoCapitalize= 'none'
                    onChangeText={password => onChangePassword(password)}
                    value={password} />
               
                </View>

                <View style= {styles.btnContainer}>
                        <CustomButton
                        textColor = "black" 
                        bgColor= "white" 
                        name = "Login" />
                        <Text style= {styles.btnTextStyle}>
                            Forgot Password?
                        </Text>
                </View>
 
            </View>


        </View>
        </TouchableWithoutFeedback>
            </SafeAreaView>
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#000075',
        paddingLeft: '8%',
        paddingRight: '8%'
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
    textSyle: {
        color: 'white',
        fontSize: 30,
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
    }
})

export default LoginPage