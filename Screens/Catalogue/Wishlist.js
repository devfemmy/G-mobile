import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Alert, Text, AsyncStorage,ActivityIndicator } from 'react-native';
import CartCard from '../../Components/CartCard';
import HomeCard from '../../Components/HomeCard';
import WishCard from '../../Components/WishlistCard';
import { AuthContext } from '../../Navigation/DrawerNav';
import axios from './../../axios.req';

const WishList = (props) => {
    // const { item_code } = props.route.params;
    const [loading, setLoading] = useState(true);
    const [wishlists, setWishlists] = useState([]);
    const [list, setEmptyList] = useState('');
    const { signOut} = React.useContext(AuthContext);


    const fetchWishlists = () => {
      setLoading(true)
      const id = AsyncStorage.getItem('Mytoken').then(
        res => {
            
            axios.get(`wish_lists/items`, {headers: {Authorization: res}})
            .then(
                res => {
                    setLoading(false); 
                    const wishlists = res.data.wish_lists;
                    console.log('wishlists', wishlists)
                    const length = wishlists.length;
                    if (length < 1) {
                        setEmptyList('Your Wishlist is Empty!')
                    }else {
                      setEmptyList('')
                    }
                    setWishlists(wishlists);

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
                     setLoading(false)
                    Alert.alert(
                        'Network Error',
                        'Please Try Again',
                        [
                          {text: 'OK', onPress: () =>  setLoading(false)},
                        ],
                        { cancelable: false }
                      )
                }


            })
        }
    )
    .catch( err => {console.log(err)}) 
    }
    useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
          fetchWishlists()
          console.log('SCREEN FOCUSED')
        });

      
      return unsubscribe;
    }, [props.navigation]);
      const alertUser = (code) => {
        Alert.alert(
            'Delete Item!',
            'Are you sure you want to delete this Wishlist?',
            [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {text: 'OK', onPress: () => proceedToDelete(code)},
            ],
            { cancelable: false }
          )
      }
      const proceedToDelete = (code) => {
        setLoading(true)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                const data = {
                    wish_list_id: code, 
                }
                axios.post('wish_lists/delete', data, {headers: {Authorization: res}})
                .then(
                    res => {  
                      // console.log(res, "res")
                    //   setShowBtn2(true)
                        setLoading(false)
                        const message = res.data.message; 
                        alert(message);
                        fetchWishlists()
                       
                    }
                )
                .catch(err => {
                //   setShowBtn2(true)
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
                              {text: 'OK', onPress: () => setLoading(true)},
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
          {wishlists.map(
              (item, index) => {
                console.log("product", item.Item_name)
                return (
                  // <View key= {index}>
                      <WishCard
                      deleteImg= {require('../../assets/delete.png')}
                      pressed= {() => alertUser(item.Wish_list_id)} 
                      key= {index}
                       price= {`${item.Item_price} points`}
                       product= {item.Item_name}
                       image= {{uri: item.Item_image}} />
                  // </View>
                )
              }
            )} 
             {/* <Text style= {{fontWeight: 'bold', textAlign: 'center'}}>{list}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4FB',
        padding: '8%',
        paddingTop: '5%'
    }
});

export default WishList;