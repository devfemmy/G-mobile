import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

const FormInput = (props) => {
  console.log('ALL', props)
    return (
        <View>
        <TextInput style= {styles.inputStyle} 
            placeholder= {props.placeholder} 
            placeholderTextColor= {props.placeholderTextColor}
            selectionColor = 'white'
            autoCorrect= {false}
            autoCapitalize= 'none'
            secureTextEntry = {props.secureTextEntry}
            onChangeText={props.onChangeText}
            value={props.value} />
            
        </View>
    )
}



const styles = StyleSheet.create({

  inputStyle: {
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 5,
    
    
  }
})

export default FormInput