import React, {useEffect, useState} from 'react';
import { View, StyleSheet,AsyncStorage,ActivityIndicator, Alert,Image, Text } from 'react-native';
import axios from '../../axios.req';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Counter from "react-native-counters";
// import {Ionicons} from 'react-native-vector-icons'

const SingleItem = (props) => {
    const { item_code, image,price, name } = props.route.params;
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [branches, setBranches] = useState([]);
    const [SortedBranches, setsortedBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [remark, setRemark] = useState('');
    const [redemption_method, setRedemption] = useState('');
    const [showBtn, setShowBtn] = useState(true)
    const [showBtn2, setShowBtn2] = useState(true)

    useEffect(() => {
        console.log('item_code', item_code)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                axios.get(`items/${item_code}`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false);
                        console.log("items", res)  
                        const item = res.data;
                        const branches = res.data.branches;
                        const redemption_method = res.data.Delivery_method;
                        const remark = res.data.Remark_lable;
                        setBranches(branches);
                        setRemark(remark);
                        setRedemption(redemption_method)
                        const sortedBranches = branches.map((branch)=>{
                            return {label:branch.Branch_name,value:branch.Branch_code}
                          }
                        );
                        setsortedBranches(sortedBranches)


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
      const addToCart = () => {
        if (selectedBranch === null) {
          alert('Select Branch')
        }else {
          setShowBtn(false)
          const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                const data = {
                    item_code: item_code,
                    redemption_method: parseInt(redemption_method),
                    branch: selectedBranch,
                    remark: remark,

                }
                console.log(data, 'DDDDD')
                axios.post('cart/add', data, {headers: {Authorization: res}})
                .then(
                    res => {  
                      // console.log(res, "res")
                        setShowBtn(true)
                        setSelectedBranch(null)
                        const message = res.data.message; 
                        alert(message);
                       
                    }
                )
                .catch(err => {
                  setShowBtn(true)
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
                        // setShowBtn(true)
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
      }
      const addToWishList = () => {
        setShowBtn2(false)
        const id = AsyncStorage.getItem('Mytoken').then(
          res => {
              const data = {
                  item_code: item_code,
                  // redemption_method: parseInt(redemption_method),
                  // branch: selectedBranch,
                  // remark: remark,

              }
              axios.post('wish_lists/add', data, {headers: {Authorization: res}})
              .then(
                  res => {  
                    // console.log(res, "res")
                    setShowBtn2(true)
                      const message = res.data.message; 
                      alert(message);
                     
                  }
              )
              .catch(err => {
                setShowBtn2(true)
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
                      // setShowBtn(true)
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
            {/* <Text>View Catalogue</Text> */}
            <View style= {styles.flexContainer}>
              <View style= {styles.card}>
                  <Image style= {styles.imageStyle} 
                  defaultSource= {require('../../assets/placeholder2.png')}
                  source= {{uri: image}} />
                  <Text style= {styles.price}>
                      {name}
                  </Text>
                  <Text style= {styles.price2}>
                      {`${price} Points`}
                  </Text>
              </View>
          </View>
          <View>
          <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerSelectStyles}
                    placeholder={{
                    label: 'Select Branch...',
                    value: null,
                    color: 'black',
                    opacity: 1
                                }}
                        onValueChange={(value) => setSelectedBranch(value)}
                        items= {
                            SortedBranches
                    }
                    />
          </View>
          <View style= {styles.flexContainer2}>
            <View>
              <Counter
            countTextStyle= {styles.countTextStyle}
            buttonTextStyle= {styles.buttonTextStyle} 
            buttonStyle= {styles.buttonStyle} start={quantity} onChange={(value) => setQuantity(value)} />
            </View>
          <View style= {styles.containerWidth}>
          {showBtn2 ?<TouchableOpacity onPress= {addToWishList} style= {styles.buttonContainer2}>
                  <Text style= {styles.buttonText2}>
                              Add To Wishlist
                    </Text>
              </TouchableOpacity>: <ActivityIndicator  size="large" color="#51087E" />} 
          </View>

          </View>
          <View style= {styles.btnContainer}>
            {showBtn ?<TouchableOpacity onPress= {addToCart} style= {styles.buttonContainer}>
                        <Text style= {styles.buttonText}>
                            ADD TO CART
                        </Text>
                </TouchableOpacity> : <ActivityIndicator  size="large" color="#51087E" />} 
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

export default SingleItem;