import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, AsyncStorage,ActivityIndicator } from 'react-native';
import HomeCard from '../../Components/HomeCard';

const WishList = (props) => {
    // const { item_code } = props.route.params;
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                
                axios.get(`wish_lists/items`, {headers: {Authorization: res}})
                .then(
                    res => {
                        setLoading(false);
                        console.log("items", res)                       
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
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#51087E" />
          </View>
        );
      }
    return (
        <View style= {styles.container}>
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
            <HomeCard 
            price= "4083 Points"
            product= "Sunlight 2in1 Hand Washing Powder 2Kg"
            image= {require('../../assets/product.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4FB',
        padding: '8%'
    }
});

export default WishList;