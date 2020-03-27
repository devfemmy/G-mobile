import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Cards = (props) => {
    return (
        <View style= {styles.screen}>
            <View>
                <Text style= {styles.textStyle}>{props.balance}</Text>
                <Text style= {styles.textStyle2}>{props.figure}</Text>
            </View>
            <View>
                <Text>Hello</Text>
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