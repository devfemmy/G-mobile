import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ShadowPropTypesIOS } from 'react-native';


const CustomInput = (props) => {
const [border, setBorder] = useState('black');
const onFocus = () => {
       setBorder('#DA0000')

}
const OnBlur = () => {
    setBorder('black')
}
const styles = StyleSheet.create({
    inputStyle: {
        color: 'black',
        borderBottomColor: border,
        borderBottomWidth: 1,
        padding: 10,
        marginVertical: 10,
        
        
      },
      FocusInput: {
        color: 'black',
        borderBottomColor: '#DA0000',
        borderBottomWidth: 1,
        padding: 10,
        marginVertical: 5,
      }
})
    return (
        <View>
            <TextInput
            autoCapitalize= {props.capitalize}
            editable= {props.editable}
            onChangeText={props.changeText}
            value = {props.value}
            secureTextEntry= {props.secure} 
                placeholder= {props.placeholder} 
                placeholderTextColor= "silver"
                selectionColor = '#DA0000'
                keyboardType= {props.keyboardType}
                autoCorrect= {false}
            onBlur = {() => OnBlur()}
            onFocus= {() => onFocus()} style= {styles.inputStyle} />
        </View>
    )
}



export default CustomInput;