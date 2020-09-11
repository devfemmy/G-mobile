import React, {useState, useEffect} from 'react';
import {View, Text, 
    Alert,
    AsyncStorage, StyleSheet, ScrollView, 
    TouchableWithoutFeedback, SafeAreaView, ActivityIndicator} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/button';
import PickerInput from '../../Components/PickerInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from '../../Components/DatePicker';
import axios from '../../axios.req';
import EventIndicator from '../../Components/EventIndicator';
import errorHandler from '../../ErrorHandler/errorHandler';
import { AuthContext } from '../../Navigation/DrawerNav';




const ProfilePage = (props) => {
    const { signOut} = React.useContext(AuthContext);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showLoaded, setShowLoaded] = useState(false);
    const [city_id, setCityId] = useState('');
    const [current_address, setCurrentAddress] = useState('');
    const [state_id, setStateId] = useState('');
    const [country_id, setCountryId] = useState('');
    const [showBtn, setShowBtn] = useState(true)
 
    const keyboardClose = () => {
        Keyboard.dismiss()
    }

    const realPhone = phone.toString()
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
               
                axios.get('profile', {headers: {Authorization: res}})
                .then(
                    res => {
                        console.log("profile-toks", res)
                        const profile = res.data.profile;
                        const lastname = profile.Last_name;
                        const firstname = profile.First_name;
                        const email = profile.User_email_id;
                        const phone = profile.Phone_no;
                        const city_id = profile.City_id;
                        const state_id = profile.State_id;
                        const country_id = profile.Country_id;
                        const current_address = profile.Current_address;
                        setFirstname(firstname);
                        setLastname(lastname);
                        setEmail(email);
                        setPhone(phone);
                        setCityId(city_id)
                        setStateId(state_id);
                        setCurrentAddress(current_address);
                        setCountryId(country_id);
                        setShowLoaded(true)

                       
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
                        showLoaded(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => setShowBtn(true)},
                            ],
                            { cancelable: false }
                          )
                    }
  
                      
                      console.log(err.response.status)
 
                })
            }
        )
        .catch( err => {console.log(err)}) 
        

      }, []);
     const  editProfile = () => {
         setShowBtn(false)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                const data = {
                    last_name:  lastname,
                    first_name: firstname,
                    city_id: city_id,
                    current_address: current_address,
                    state_id: state_id,
                    country_id: country_id,
                    phone_no: parseInt(phone)
                }
                axios.post('profile', data, {headers: {Authorization: res}})
                .then(
                    res => {  
                        const message = res.data.message; 
                        alert(message);
                        setShowBtn(true)
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
                        setShowBtn(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => setShowBtn(true)},
                            ],
                            { cancelable: false }
                          )
                    }
  
                      
                
 
                })
            }
        )
        .catch( err => {console.log(err)})
      }
      let showContent = <EventIndicator color = "#000075" />

      if (showLoaded) {
          showContent = (
        <View>
            <View>
            <CustomInput 
            changeText = {(firstname) => setFirstname(firstname)}
            value= {firstname}
            placeholder= "First Name" />
            <CustomInput 
            changeText = {(lastname) => setLastname(lastname)}
             value= {lastname}
            placeholder= "Last Name" />
            <CustomInput 
             changeText = {(phone) => setPhone(phone)}
             value= {realPhone}
            placeholder= "Phone Number"
            keyboardType= "numeric"
            />
            <CustomInput 
             value= {email}
            placeholder= "Email Address"
            keyboardType= "email-address"
            />
            <PickerInput  />
            {/* <CustomInput placeholder= "Date of Birth" /> */}
            </View>
            <View style= {styles.btnContainer}>
                {showBtn ? <CustomButton
                clicked= {editProfile}
                textColor = "white" 
                bgColor= "#000075" 
                name = "SAVE"
                /> : <ActivityIndicator size= "large" color= "#000075"/>}
                 
            </View>
        </View>

          )
      }
    return (
        <ScrollView style = {styles.screen}>
            <SafeAreaView>
            <TouchableWithoutFeedback onPress= {keyboardClose}>
                <View>
                    {showContent}
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
        marginVertical: 40
    }
})

export default ProfilePage