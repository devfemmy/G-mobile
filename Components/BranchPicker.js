import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const BranchPicker = () => {
  // const [selectedValue, setSelectedValue] = useState("java");
const [border, setBorder] = useState('black');
const onFocus = () => {
       setBorder('#DA0000')

}
const OnBlur = () => {
    setBorder('black')
}
const pickerSelectStyles = StyleSheet.create({

  inputIOS: {
    
    color: 'black',
    opacity: 1,
    borderBottomColor: border,
    borderBottomWidth: 1,
    padding: 10,
    margin: 0,
    
  },
  inputAndroid: {
    color: 'black',
    opacity: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    margin: 0
  }
});
  return (
    <View>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            placeholder={{
              label: 'Select Gender...',
              value: null,
              color: 'black',
              opacity: 1
            }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ]}
            onClose = {() => OnBlur()}
            onOpen= {() => onFocus()}
        />

    </View>
  );
}



export default BranchPicker;