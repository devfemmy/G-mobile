import React, { useState } from 'react';
import {View, Alert, 
    AsyncStorage, StyleSheet, ScrollView, 
    TouchableWithoutFeedback, SafeAreaView, ActivityIndicator} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/button';
// import PickerInput from '../../Components/PickerInput';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from '../../Components/DatePicker';
import axios from '../../axios.req';
import { AuthContext } from '../../Navigation/DrawerNav';




const ChangePassword = () => {
    const keyboardClose = () => {
        Keyboard.dismiss()
    }
    const { signOut} = React.useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [Password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loader, setLoader] = useState(true);
    const changeMyPassword = () => {
        if (oldPassword === '' || Password === '' || newPassword === '') {
            alert('Password fields cannot be empty')
        }else {
            if (Password !== newPassword) {
                alert("Password does not match")
            }else {
                setLoader(false)
                const id = AsyncStorage.getItem('Mytoken').then(
                    res => {
                        const data = {
                            current_password: oldPassword,
                            new_password: newPassword,
                            
                        }
                        axios.post('change_password', data, {headers:{Authorization:res}})
                        .then(
                            res => {  
                                console.log(res, "CHANGE")
                                const message = res.data.message;
                                alert(message)
                                setLoader(true)
                            }
                        )
                        .catch(err => {
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
                                setLoader(true)
                                Alert.alert(
                                    'Network Error',
                                    'Please Try Again',
                                    [
                                      {text: 'OK', onPress: () =>   setLoader(true)},
                                    ],
                                    { cancelable: false }
                                  )
                            }
                        })
                    }
                )
                .catch( err => {console.log(err)})
            }
        }
      
    }
    return (
        <ScrollView style = {styles.screen}>
            <SafeAreaView>
            <TouchableWithoutFeedback onPress= {keyboardClose}>
                <View>
                    <View>
                    <CustomInput 
                    capitalize = "none" 
                    secure={true}
                    changeText = {(oldPassword) => setOldPassword(oldPassword)}
                    value= {oldPassword}
                    placeholder= "Old Password" />
                    <CustomInput
                    capitalize = "none" 
                     changeText = {(Password) => setPassword(Password)}
                     value= {Password}
                    secure={true}
                    placeholder= "New Password" />
                    <CustomInput 
                    capitalize = "none" 
                     changeText = {(newPassword) => setNewPassword(newPassword)}
                     value= {newPassword}
                    secure={true}
                    placeholder= "Confirm New Password" />
                    </View>
                    <View style= {styles.btnContainer}>
                        {loader ?  <CustomButton
                        clicked = {changeMyPassword}
                        textColor = "white" 
                        bgColor= "#000075" 
                        name = "CHANGE PASSWORD"
                        /> :
                        <ActivityIndicator color= "#000075" size= "large" />
                        }
                       
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
        backgroundColor: 'white',
        padding: '5%'
    },
    btnContainer: {
        marginVertical: 70
    }
})

export default ChangePassword;