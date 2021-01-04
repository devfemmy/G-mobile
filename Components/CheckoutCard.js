import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CheckoutCard = (props) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            width: '100%',
            maxHeight: 100,
            justifyContent: 'space-between',
            alignItems: 'center',

        },
        fullContainer: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 15,
            borderColor: '#EFEFEF',
            borderWidth: 1,
            borderRadius: 5,
            marginVertical: 15
        },
        imageStyle: {
            height: 50,
            width: 50
        },
        textStyle: {
            color: '#000000',
            fontWeight: 'bold'
        },
        prdContainer: {
            width: '50%',
            marginLeft: 10
        },
        textStyle2: {
            color: '#A2A2A2'
        },
        flexContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 8
        }
    })
    return (
        <View style= {styles.fullContainer}>
            <View style= {styles.container}>
            <Image source= {props.image} style= {styles.imageStyle} />
            <View style= {styles.prdContainer}>
                <Text style= {styles.textStyle}>
                    {props.product}
                </Text>
            </View>
            <View>
                {props.quantity}
            </View>
        </View>
        <View style= {{marginTop: 8}}>
            <Text>Redemption Type: <Text>
            {props.delivery_type}</Text></Text>
        </View>
        </View>
    )
}

export default CheckoutCard