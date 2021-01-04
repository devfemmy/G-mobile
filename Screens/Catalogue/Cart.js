import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet,Alert, Text, AsyncStorage,ActivityIndicator } from 'react-native';
import HomeCard from '../../Components/HomeCard';
import axios from '../../axios.req';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CartCard from '../../Components/CartCard';
import Counter from "react-native-counters";
import { AuthContext } from '../../Navigation/DrawerNav';

const Cart = (props) => {
    // const { item_code } = props.route.params;
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cartTotal, setCartTotal] = useState(0);
    const [cart, setCart] = useState([]);
    const [emptyCart, setEmptyCart] = useState('')
    const {signOut} = useContext(AuthContext);


    const makeApiCall = () => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                
                axios.get(`cart/items`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false); 
                        // console.log('API CALL MADE')
                        console.log("DATA ITEMSSSS", res.data)
                        const cartTotal =  res.data.cart_total; 
                        const cart = res.data.items;
                        // console.log('cartTotal', cart)
                        const length = cart.length;
                        if (length < 1) {
                            setEmptyCart('Your Cart is Empty!')
                        }
                        setCart(cart)
                        setCartTotal(cartTotal)                
                    }
                )
                .catch(err => {
                    setLoading(false);
                    const code = err.response.status;
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [{
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              {text: 'OK', onPress: () => signOut()},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                        // showLoaded(true)
                        // Alert.alert(
                        //     'Network Error',
                        //     'Please Try Again',
                        //     [
                        //       {text: 'OK', onPress: () => setLoading(false)},
                        //     ],
                        //     { cancelable: false }
                        //   )
                    }
  
                      
                      console.log(err.response.status)
 
                })
            }
        )
        .catch( err => {console.log(err)}) 
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            makeApiCall()
            // console.log('SCREEN FOCUSED')
          });
  
        
        return unsubscribe;
      }, [props.navigation]);
      const alertUser = (code, redemption_method, branch, remark) => {
        Alert.alert(
            'Delete Item!',
            'Are you sure you want to delete Item from Cart?',
            [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {text: 'OK', onPress: () => proceedToDelete(code, redemption_method, branch, remark)},
            ],
            { cancelable: false }
          )
      }
      const proceedToDelete = (code, redemption_method, branch, remark) => {
          setLoading(true)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                const data = {
                    item_code: code,
                    redemption_method: redemption_method,
                    branch: branch,
                    remark: remark
                    // redemption_method: parseInt(redemption_method),
                    // branch: selectedBranch,
                    // remark: remark,
  
                }
                axios.post('cart/delete', data, {headers: {Authorization: res}})
                .then(
                    res => {  
                      // console.log(res, "res")
                    //   setShowBtn2(true)
                        setLoading(false)
                        const message = res.data.message; 
                        alert(message);
                        makeApiCall()
                       
                    }
                )
                .catch(err => {
                //   setShowBtn2(true)
                    console.log(err, "error")
                    setLoading(false)
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
                              {text: 'OK', onPress: () => setLoading(false)},
                            ],
                            { cancelable: false }
                          )
                    }
  
                      
                
  
                })
            }
        )
        .catch( err => {console.log(err)})
      }
      const processOrder = () => {
        if (emptyCart === 'Your Cart is Empty!') {
            alert('You have no Order')
        } else {
            const pickupItemExist = cart.some(el => el.Redemption_method === 1);
            const deliveryItemExist = cart.some(el => el.Redemption_method === 2);
            if (pickupItemExist && !deliveryItemExist) {
                setLoading(true)
                const id = AsyncStorage.getItem('Mytoken').then(
                    res => {
                        const data = {
                            user_pin:  1290   
                        }
                        axios.post('cart/checkout', data, {headers: {Authorization: res}})
                        .then(
                            res => {  
                              // console.log(res, "res")
                            //   setShowBtn2(true)
                            const status = res.data.status;
                            let message;
                            if (status === 1) {
                                 message = "Redemption Successful"; 
                            }
                            
                            Alert.alert(
                                'Success',
                                message,
                                [
                                  {text: 'OK', onPress: () => props.navigation.navigate('Catalogue')},
                                ],
                                { cancelable: false }
                              )
                            setLoading(false)
                               
                            }
                        )
                        .catch(err => {
                        //   setShowBtn2(true)
                            console.log(err, "error")
                            setLoading(false)
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
            } else {
                props.navigation.navigate('Address', {cart: cart, cart_total: cartTotal})
            }
        }

      }

      const upDateCart = (value, rm, branch, code, remark ) => {
          console.log('value', value)
            setQuantity(value);
            const id = AsyncStorage.getItem('Mytoken').then(
                res => {
                    const data = {
                        item_code:  code,
                        redemption_method: rm,
                        branch: branch,
                        quantity: value,
                        remark: remark
                    }
                    console.log('updatedata', data)
                    setLoading2(true)
                    axios.post('cart/update', data, {headers: {Authorization: res}})
                    .then(
                        res => {  
                          // console.log(res, "res")
                        //   setShowBtn2(true)
                        console.log('update', res);
                        makeApiCall()
                        const message = res.data.message;
                        const cart_total= res.data.cart_total;
                        setCartTotal(cart_total)
                        // let message;
                        // if (status === 1) {
                        //      message = "Cart Updated"; 
                        // }
                        
                        Alert.alert(
                            'Success',
                            message,
                            [
                              {text: 'OK'},
                            ],
                            { cancelable: false }
                          )
                        setLoading2(false)
                           
                        }
                    )
                    .catch(err => {
                    //   setShowBtn2(true)
                        console.log(err, "error")
                        setLoading2(false)
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
    //   if (loading2 === true && loading === false) {
    //     return (
    //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //        <ActivityIndicator  size="large" color="#51087E" />
    //        <Text>Updating Cart</Text>
    //       </View>
    //     );
    //   }
    return (
        <View style= {styles.container}>
            <ScrollView style= {styles.scroll}>
            <View>
            {loading2 ? (<View> 
            <ActivityIndicator  size="large" color="#51087E" />
                        <Text style= {{textAlign: 'center'}}>Updating Cart</Text>
           </View> )
           
           : null}
            </View>

                <Text style= {{textAlign: 'center'}}>{emptyCart}</Text>
                {cart.map(
                    (item, index) => {
                        console.log('quantity', item.Quantity)
                        let delivery_type = null;
                        if (item.Redemption_method === 2) {
                            delivery_type = "Delivery"
                        } else if (item.Redemption_method === 1) {
                            delivery_type = "Pick Up"
                        } else{
                           delivery_type= "Delivery & Pick Up"
                        }
                        return (
                            <View key= {index}>
                            <CartCard 
                            pressed= {()=> alertUser(item.Item_code, item.Redemption_method, item.Branch, item.Remark)}
                            remark= {item.Remark}
                            remarkLabel= {item.Remark_label}
                            delivery_type= {delivery_type}
                            quantity= {<Counter
                            countTextStyle= {styles.countTextStyle}
                            buttonTextStyle= {styles.buttonTextStyle} 
                            buttonStyle= {styles.buttonStyle} start={item.Quantity} 
                            min= {1}
                            max= {9}
                            // value= {22}
                            onChange={(value) => upDateCart(value, item.Redemption_method, item.Branch, item.Item_code, item.Remark)} />}
                            price= {`${item.Item_price * item.Quantity} Points`}
                            product= {item.Item_name}
                            image= {{uri: item.Item_image}} />
                            </View>
                        )
                    }
                )}
            </ScrollView>
            <View style= {styles.footer}>
                <Text onPress= {()=> props.navigation.navigate('Catalogue')} style= {styles.textColor}>Continue Shopping</Text>
                <View style= {styles.flexContainer}>
                    <Text style= {styles.subTotal}>Subtotal</Text>
                    <Text style= {styles.subTotal}>
                        {`${cartTotal} Points`}
                    </Text>

                </View>
                <TouchableOpacity onPress= {processOrder} style= {styles.btnContainer}>
                    <Text style= {styles.btnText}>Proceed To Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4FB',
        // padding: '8%'
    },
    subTotal: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 3
    },
    scroll: {
        padding: '8%'
    },
    footer: {
        backgroundColor: 'white',
        minHeight: 120,
        padding: 20
    },
    textColor: {
        color: '#2E3192',
        fontSize: 16,
        fontWeight: 'bold'
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        backgroundColor: '#000075',
        marginVertical: 10,
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    },
    buttonStyle: {
        borderColor: 'white',
        // backgroundColor: 'red',
        maxWidth: '1%',
        padding: 0
    },
    countTextStyle: {
        color: 'black',
        // backgroundColor: 'yellow',
        padding: 0,
        margin: 0
    },
    buttonTextStyle: {
        color: '#000075',
        fontWeight: 'bold',
        fontSize: 20
    },
});

export default Cart;