import React, {useEffect, useState} from 'react';
import { View, StyleSheet,AsyncStorage,ActivityIndicator, Alert,Image, Text } from 'react-native';
import axios from '../../axios.req';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Counter from "react-native-counters";
import PickerInput from '../../Components/PickerInput';
// import {Ionicons} from 'react-native-vector-icons'

const ShippingAddress = (props) => {
    // const { cart } = props.route.params;
    const [loading, setLoading] = useState(true);
    const [states, setStates] = useState([]);
    const [sortedStates, setSortedStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [sortedCities, setSortedCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');


    // console.log('Address', cart)
    console.log('State', states)
    console.log('City', sortedCities)

    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get(`country/1`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false);
                        console.log("items", res)  
                        const state = res.data.states;
                        setStates(state);
                        const sortedStates = states.map((state)=>{
                            return {label:state.State_name,value:state.State_id}
                          }
                        );
                        setSortedStates(sortedStates)


                    }
                )
                .catch(err => {
                    setLoading(false);
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
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () =>  setLoading(false)},
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
      const loadCity = (value) => {
       
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get(`states/${value}`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false);
                        console.log("city", res)  
                        const city = res.data.cities;
                        setCities(city)
                        const sortedCities = cities.map((city)=>{
                            return {label:city.City_name,value:city.City_id}
                          }
                        );
                        setSortedCities(sortedCities)


                    }
                )
                .catch(err => {
                    setLoading(false);
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
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () =>  setLoading(false)},
                            ],
                            { cancelable: false }
                          )
                    }
  
                      
                      console.log(err.response.status)
 
                })
            }
        )
        .catch( err => {console.log(err)}) 
      }
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
      const pickerSelectStyles = StyleSheet.create({

        inputIOS: {
          
          color: 'black',
          opacity: 1,
        //   borderBottomColor: border,
          borderBottomWidth: 1,
          padding: 10,
          margin: 0,
          
        },
        inputAndroid: {
          color: 'black',
          opacity: 1,
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          padding: 10,
          margin: 0
        }
      });

    return (
        <View style= {styles.container}>

          <View>
          <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerSelectStyles}
                    placeholder={{
                    label: 'Select State...',
                    value: null,
                    color: 'black',
                    opacity: 1
                                }}
                        onValueChange={(value) => loadCity(value)}
                        items= {
                            sortedStates
                    }
                    />
                <View>
                {/* <PickerInput  />
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerSelectStyles}
                    placeholder={{
                    label: 'Select City...',
                    value: null,
                    color: 'black',
                    opacity: 1
                                }}
                        onValueChange={(value) => setSelectedCity(value)}
                        items= {
                            sortedCities
                    }
                    /> */}
                </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4FB',
        padding: '8%'
    },
    containerWidth: {
      width: '60%'
    },
    btnContainer: {
        marginVertical: 25
    },
    buttonStyle: {
        borderColor: '#000075'
    },
    countTextStyle: {
        color: 'black'
    },
    buttonTextStyle: {
        color: '#000075',
        fontWeight: 'bold',
        fontSize: 18
    },
    shopping: {
      fontWeight: 'bold',
      fontSize: 18,
      marginVertical: 15,
      textAlign: 'center'
    },
    flexContainer: {
        // maxWidth: Dimensions.get('window').width / 3 - 10, // Width / 3 - (marginLeft and marginRight for the components)
        justifyContent: 'center',
        alignItems:'center', 
        flexDirection: 'row',
        flexWrap: 'wrap',   
        margin:10,
        maxWidth: '100%'
        
      },
      flexContainer2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25
      },
      card: {
        backgroundColor: 'white',
        width: '80%',
        // maxWidth: '100%',
        marginVertical: 15,
        minHeight: 250,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: "#1F1F1F1F",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 5,
      },
      imageStyle: {
        width: '100%',
        height: 200,
        maxHeight: 200,
        resizeMode: 'contain'
      },
      price: {
        color: '#000000',
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'center'
      },
      price2: {
        color: '#A2A2A2',
        marginBottom: 5,
        textAlign: 'center'
      },
      buttonContainer: {
          backgroundColor: '#000075',
          height: 50,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center'

      },
      buttonContainer2: {
        width: '100%',
        backgroundColor: '#2E31921A',
        borderColor: '#2E3192',
        borderWidth: 1,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonText2: {
      color: '#2E3192',
      fontWeight: 'bold'
    },
      buttonText: {
          color: 'white',
          fontWeight: 'bold'
      }
});

export default ShippingAddress;