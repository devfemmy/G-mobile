import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CatalogCard = (props) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 15,
            borderColor: '#EFEFEF',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 15,
            marginVertical: 10,
            // marginHorizontal: 50
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
            width: '50%'
        },
        textStyle2: {
            color: '#A2A2A2'
        }
    })
    return (
        <View>
            <TouchableOpacity onPress= {props.pressed}>
                <View style= {styles.container}>
                    <Text style= {styles.textStyle}>
                        {props.product}
                    </Text>
                <Image style= {{width: 30, height: 30, resizeMode: 'contain'}} source= {require('../assets/arrow.png')} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CatalogCard