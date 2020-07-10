import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, AsyncStorage } from 'react-native';

import QRCode from 'react-native-qrcode';

const QrCodeScreen = () => {
    const [QrData, setQrData] = useState('');

    const id = AsyncStorage.getItem('membershipId').then(
        res => {
            setQrData(res)
        
        }
      ).catch(err => console.log(err));
    return (
        <View style= {styles.container}>
           <Image style= {styles.imageSize} source= {require('./../../assets/card.png')} />
           <View>
               <Text style= {styles.textStyle}>
                   Simply scan this QR code at any of our stores when checking out to earn your reward point
               </Text>
           </View>
           <View style= {styles.flexContainer}>
                <View style= {styles.qrContainer}>
                <Text style= {styles.textStyling}>Membership ID: {QrData}</Text>
                <QRCode
                value={QrData}
                size={400}
                bgColor='black'
                fgColor='white'/>
               
                </View>
           
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: '8%',
        paddingVertical: 25
    },
    flexContainer: {
        marginHorizontal: '25%'
    },
    textStyling: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10
        // fontWeight: 'bold'
    },
    qrContainer: {
      
      
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

export default QrCodeScreen;