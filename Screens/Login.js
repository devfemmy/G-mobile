import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, AsyncStorage,
     Image, TouchableWithoutFeedback, 
     Alert,
     Keyboard, ScrollView, SafeAreaView, ActivityIndicator} from 'react-native';
import CustomButton from '../Components/button';
import {AuthContext} from '../Navigation/DrawerNav'
import FormInput from '../Components/FormInput';
import axios from 'axios';


const LoginPage = (props) => {
    console.log('MY PROPS', props)
    const { signIn} = React.useContext(AuthContext);
    const { signOut} = React.useContext(AuthContext);

    const [email, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [button, setBtn] = useState(false)
    // const [value, onChangeText] = useState('');
    // const [password, onChangePassword] = useState('');
    const keyboardClose = () => {
        Keyboard.dismiss()
    }
    const logInUser = ()=> {
        if (email === '' || password === '') {
            alert("Please fill in your correct credentials")
        } else {
            // {props.userButton}
            setBtn(true)
            // signIn({email:email.email,password:email.password});
            const data = {
                email: email,
                password: password
            }
            console.log('33', data)
            axios.post('https://demoperxapi.perxclm.com/perx/public/api/grandloyalty/login', data)
            .then( res => {
                setBtn(false)
                console.log('API', res)
              const response = res.data;
              if (response.status === 1) {
                const token = response.success.token;
                const firstname = response.success.user.First_name;
                const memberId = response.success.user.Membership_id;
                const currentBal = response.success.user.Available_balance;
                const blockedPts = response.success.user.Blocked_points;
                AsyncStorage.setItem('membershipId', memberId);
                AsyncStorage.setItem('firstname', firstname);
                AsyncStorage.setItem('currentBal', currentBal);
                AsyncStorage.setItem('blockedpts', blockedPts);
                AsyncStorage.setItem('Mytoken', "Bearer "+token);
            
                signIn({token:token});
    
              }else {
               
           
                alert('incorrect username or password')
              }
              
            }).catch(err => {
                const code = err.response.status;
                if (code === 401) {
                    Alert.alert(
                        'Error!',
                        'Expired Token',
                        [
                          {text: 'OK', onPress: () => signOut()},
                        ],
                        { cancelable: false }
                      )
                  
                } else {
                    setBtn(false)
                    Alert.alert(
                        'Network Error',
                        'Please Try Again',
                        [
                          {text: 'OK', onPress: () =>  setBtn(false)},
                        ],
                        { cancelable: false }
                      )
                }
            })
           
   

        }
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
                    <FormInput 
                    placeholder= "Username" 
                    placeholderTextColor= "grey"
                    secureTextEntry = {false}
                    value={email}
                    onChangeText={setUsername}
                    />
                    <FormInput 
                    placeholder= "Password" 
                    placeholderTextColor= "grey"
                    secureTextEntry = {true}
                    value={password}
                    onChangeText={setPassword}
                    />
               
                </View>

                <View style= {styles.btnContainer}>
                    {button ? <ActivityIndicator  size="large" color="#fff" /> : 
                                        <CustomButton
                                        clicked={() => logInUser()}
                                        textColor = "black" 
                                        bgColor= "white" 
                                        name = "Login" />
                    }
        
                        <Text   onPress={() => props.navigation.navigate('ForgotPass')} style= {styles.btnTextStyle}>
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