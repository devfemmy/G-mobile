import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';


const NotificationCard = (props) => {
    return (
                        <View 
            style= {{...styles.screens, ...{backgroundColor:props.bg}}}>

                <View>
                    <Image 
                    style= {styles.imageStyle}
                    source= {props.image} />
                </View>
                <View>
                <Text style= {styles.textStyle}>{props.date}</Text>
                <Text style= {styles.textStyle3}>{props.title}</Text>
                </View>
                <View>
                <Image 
                    style= {styles.imageStyle2}
                    source= {props.imageBell} />
                </View>
            
            
            </View>
      

    )
}
const styles = StyleSheet.create({
    screens: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(220, 222, 233, 0.301)',
        borderBottomWidth: 0.4,
        borderBottomColor: 'rgba(0, 0, 0, 0.164)',
        padding: 20,
        minHeight: 30,
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
        height: 20
    },
    imageStyle2: {
        width: 15,
        height: 18
    }
})
export default NotificationCard;