import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const HomeCard = (props) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            maxHeight: 100,
            justifyContent: 'space-between',
            alignItems: 'center',
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
            width: '50%'
        },
        textStyle2: {
            color: '#A2A2A2'
        }
    })
    return (
        <View style= {styles.container}>
            <Image source= {props.image} style= {styles.imageStyle} />
            <View style= {styles.prdContainer}>
                <Text style= {styles.textStyle}>
                    {props.product}
                </Text>
            </View>
            <Text style= {styles.textStyle2}>
                {props.price}
            </Text>
        </View>
    )
}

export default HomeCard