import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';


const NotificationCard = (props) => {
    return (
        <View  style= {{...styles.container, ...{backgroundColor:props.bg}}}>
                <TouchableOpacity style= {styles.screens} onPress= {props.read}>
                    <View>
                        <Image 
                        style= {styles.imageStyle}
                        source= {props.image} />
                    </View>
                <View style= {styles.textContainer}>
                <Text style= {styles.textStyle}>{props.date}</Text>
                <Text style= {styles.textStyle3}>{props.title}</Text>
                </View>
                </TouchableOpacity>
                <View style= {{...styles.lowerContainer, ...{backgroundColor:props.bg}}}>
                <TouchableOpacity onPress= {props.pressed}>
                <Image 
                    style= {styles.imageStyle2}
                    source= {props.imageBell} />
                </TouchableOpacity>
                </View>
            
            
            </View>
      

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(220, 222, 233, 0.301)',
        borderBottomWidth: 0.4,
        borderBottomColor: 'rgba(0, 0, 0, 0.164)',
        paddingHorizontal: 25
    },
    lowerContainer: {
        // width: '20%',
        alignItems: 'flex-start',
        backgroundColor: 'transparent'
    },
    screens: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        minHeight: 30,
    },
    textContainer: {
        width: '70%'
    },
    dateStyle: {
        marginVertical: 5,
        color: '#ea0000',
    },
    textStyle: {
        fontSize: 15,
        marginVertical: 2,
        fontWeight: 'bold'
    },
    imageStyle: {
        width: 24,
        height: 20,
    },
    imageStyle2: {
        width: 15,
        height: 18,
        resizeMode: 'contain'
    }
})
export default NotificationCard;