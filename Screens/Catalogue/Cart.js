import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, AsyncStorage,ActivityIndicator } from 'react-native';
import HomeCard from '../../Components/HomeCard';
import axios from '../../axios.req';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Cart = (props) => {
    // const { item_code } = props.route.params;
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                
                axios.get(`cart/items`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false);
                        console.log("cart", res)                       
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
            <HomeCard 
            price= "4083 Points"
            product= "Sunlight 2in1 Hand Washing Powder 2Kg"
            image= {require('../../assets/product.png')} />
            <HomeCard 
            price= "4083 Points"
            product= "Sunlight 2in1 Hand Washing Powder 2Kg"
            image= {require('../../assets/product.png')} />
            <HomeCard 
            price= "4083 Points"
            product= "Sunlight 2in1 Hand Washing Powder 2Kg"
            image= {require('../../assets/product.png')} />
            </ScrollView>
            <View style= {styles.footer}>
                <Text style= {styles.textColor}>Continue Shopping</Text>
                <View style= {styles.flexContainer}>
                    <Text style= {styles.subTotal}>Subtotal</Text>
                    <Text style= {styles.subTotal}>Subtotal</Text>

                </View>
                <TouchableOpacity style= {styles.btnContainer}>
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
        height: 40,
        backgroundColor: '#000075',
        marginVertical: 10,
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default Cart;