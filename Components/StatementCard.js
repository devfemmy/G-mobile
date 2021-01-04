import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StatementCard = (props) => {
    return (
        <TouchableOpacity>
        <View style= {{...styles.screens, ...{backgroundColor:props.bg}}}>
            <View>
                <Image 
                style= {styles.imageStyle}
                source= {props.image} />
            </View>
            <View style= {styles.container}>
            <Text style= {{...styles.textStyle, ...{color:props.color}}}>{props.desc}</Text>
            <Text style= {styles.textStyle2}>Description:</Text>
            <Text style= {styles.textStyle3}>{props.transDes}</Text>
            <Text style= {{...styles.dateStyle, ...{color:props.color}}}>
                {props.date}
            </Text>
            </View>
            <View style= {styles.priceContainer}>
            <Text style= {{...styles.textStyle7, ...{color:props.color}}}>
                {props.figure}
            </Text>
            </View>
           
           
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    screens: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: 'rgba(220, 222, 233, 0.301)',
        borderBottomWidth: 0.4,
        borderBottomColor: 'rgba(0, 0, 0, 0.164)',
        padding: 20,
        minHeight: 50,
    },
    container: {
        // backgroundColor: 'red',
        width: '63%'
    },
    dateStyle: {
        marginVertical: 5,
        color: '#ea0000',
    },
    textStyle2: {
        fontWeight: 'bold'
    },
    priceContainer: {
        width: '15%'
    },
    textStyle: {
        color: '#ea0000',
        fontSize: 15,
        marginVertical: 2,
        fontWeight: 'bold'
    },
    textStyle7: {
        color: '#ea0000',
        fontSize: 15,
        marginVertical: 2,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    imageStyle: {
        width: 40,
        height: 25,
        resizeMode: 'contain'
    }
})
export default StatementCard;