import React, {useState} from 'react';
import { View, StyleSheet, Text,AsyncStorage, Image, ScrollView } from 'react-native';
import Barcode from './../../Barcode';
import { SafeAreaView } from 'react-native';

const BarCodeScreen = (props) => {
    const [barData, setBarData] = useState('');
    const [show, setShow] = useState(false)

    const id = AsyncStorage.getItem('membershipId').then(
        res => {
            setBarData(res)
            setShow(true)
        
        }
      ).catch(err => console.log(err));
      return (
        // <View>
          <ScrollView style={styles.container}>
              <SafeAreaView>
                  <Image style= {styles.imageSize} source= {require('./../../assets/card.png')} />
                <View>
                  <Text style= {styles.textStyle}>
                      Simply scan this Barcode at any of our stores when checking out to earn your reward point
                  </Text>
              </View>
              <View style= {styles.barCodeContainer}>
                {/* <Barcode
                    value="123456789999"
                    options={{ format: 'UPC', background: 'white' }}
                />
                <Barcode
                    value="9501101530003"
                    options={{ format: 'EAN13', background: 'yellow' }}
                /> */}
                {show ? <Barcode
                    value={barData}
                    options={{ format: 'CODE128', background: 'white' }}
                />: null}
          
              </View>
              </SafeAreaView>
          </ScrollView>
 

        // </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: '8%',
        paddingVertical: 25
      },
      barCodeContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      textStyle: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 20
    },
    imageSize: {
        width: '100%',
        height: 200,
        marginBottom: 20
    }
    });

export default BarCodeScreen;