import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const Cards = (props) => {
    return (
        <View style= {styles.screen}>
            <View>
                <Text style= {styles.textStyle}>{props.balance}</Text>
                <Text style= {styles.textStyle2}>{props.figure}</Text>
            </View>
            <View>
                <Image style= {styles.imageStyle} source= {props.imageUrl} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000075',
        borderRadius: 15,
        padding: 20,
        height: 70,
        marginBottom: 15
    },
    imageStyle: {
        height: 20,
        width: 20
    },
    textStyle: {
        color: 'white',
        fontSize: 12,
        opacity: 0.7
    },
    textStyle2: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})
export default Cards;