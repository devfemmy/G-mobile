import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Alert, Text, AsyncStorage,ActivityIndicator } from 'react-native';
import HomeCard from '../../Components/HomeCard';
import axios from '../../axios.req';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CartCard from '../../Components/CartCard';
import Counter from "react-native-counters";
import CheckoutCard from '../../Components/CheckoutCard';
import { AuthContext } from '../../Navigation/DrawerNav';

const Checkout = (props) => {
    const { cart, shipping_details, cart_total, id } = props.route.params;
    const [loading, setLoading] = useState(true);
    const [delivery_cost, setDelivery] = useState(0);
    const [grand_Total, setGrandTotal] = useState(0)
    // const [cartTotal, setCartTotal] = useState(0);
    // const [cart, setCart] = useState([]);
    // const [emptyCart, setEmptyCart] = useState('')
    const { signOut} = React.useContext(AuthContext);
    const makeApiCall = () => {
        const token = AsyncStorage.getItem('Mytoken').then(
            res => {
                const data = {
                    // cart: cart,
                    shipping_address_id: id
                }
                axios.post(`delivery/price`, data, {headers: {Authorization: res}})
                .then(
                    res => {
                        const delivery_cost = res.data.data.Delivery_price;
                        setDelivery(delivery_cost) 
                        const total = parseInt(delivery_cost) + parseInt(cart_total);
                        setGrandTotal(total)

                        setLoading(false);


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

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            makeApiCall()
            // console.log('SCREEN FOCUSED')
          });
  
        
        return unsubscribe;
      }, [props.navigation]);
      const processDelivery = () => {
        setLoading(true)
        const token = AsyncStorage.getItem('Mytoken').then(
            res => {
                const data = {
                    shipping_address_id: id,
                    delivery_fee: delivery_cost,
                    user_pin:  1290   
                }
                axios.post('cart/checkout', data, {headers: {Authorization: res}})
                .then(
                    res => {  
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
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
    return (
        <View style= {styles.container}>
            <ScrollView style= {styles.scroll}>
                {/* <Text style= {{textAlign: 'center'}}>{emptyCart}</Text> */}
                {cart.map(
                    (item, index) => {
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
                            <CheckoutCard 
                            // pressed= {()=> alertUser(item.Item_code, item.Redemption_method, item.Branch)}
                            delivery_type= {delivery_type}
                            quantity= {<Text style= {{color: 'black', fontWeight: 'bold'}}>{`${item.Item_price} points`}</Text>}
                            price= {`${item.Item_price} points`}
                            product= {item.Item_name}
                            image= {{uri: item.Item_image}} />
                            </View>
                        )
                    }
                )}
                <View style= {styles.deliveryAddress}>
                        <Text style= {{fontWeight: 'bold', fontSize: 15}}>Delivery Address</Text>
                        <Text style= {styles.textStyle}>
                        {`${shipping_details.First_name} ${shipping_details.Last_name}`}
                        </Text>
                        <Text>
                        {`${shipping_details.Full_address}`}
                        </Text>
                </View>
            </ScrollView>
            <View style= {styles.footer}>
                {/* <Text onPress= {()=> props.navigation.navigate('Catalogue')} style= {styles.textColor}>Continue Shopping</Text> */}
                <View style= {styles.flexContainer}>
                    <Text style= {styles.subTotal}>Subtotal</Text>
                    <Text style= {styles.subTotal}>
                        {`${cart_total} Points`}
                    </Text>

                </View>
                <View style= {styles.flexContainer}>
                    <Text style= {styles.subTotal}>Delivery Cost</Text>
                    <Text style= {styles.subTotal}>
                        {`${delivery_cost} Points`}
                    </Text>

                </View>
                <View style= {styles.flexContainer}>
                    <Text style= {styles.grandTotal}>Grand Total</Text>
                    <Text style= {styles.grandTotal}>
                        {`${grand_Total} Points`}
                    </Text>

                </View>
                <TouchableOpacity onPress= {processDelivery} style= {styles.btnContainer}>
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
    deliveryAddress: {
        backgroundColor: 'white',
        minHeight: 100,
        padding: 15,
        marginVertical: 25,
        borderRadius: 5
    },
    grandTotal: {
        color: '#000075',
        fontWeight: 'bold',
        fontSize: 17,
        marginVertical: 8
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
        borderColor: 'white'
    },
    countTextStyle: {
        color: 'black'
    },
    buttonTextStyle: {
        color: '#000075',
        fontWeight: 'bold',
        fontSize: 18
    },
    textStyle: {
        marginVertical: 5
    }
});

export default Checkout;