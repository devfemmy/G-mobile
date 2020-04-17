import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const CustomButton = (props) => {
    return (
        <TouchableOpacity
        onPress= {props.clicked}
    
        style= {{...styles.button, backgroundColor: props.bgColor}}>
            <Text style= {{...styles.textStyle, color: props.textColor }}>
            {props.name}
            </Text>
           
        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 40,
        fontSize: 18
        
    },
    textStyle: {
        fontWeight: 'bold'
    }
})



export default CustomButton