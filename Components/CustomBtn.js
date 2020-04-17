import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const CustomBtn = props => {
    return <HeaderButton {...props} IconComponent= {Ionicons} iconSize= {40}
    color= {Platform.OS === 'android' ? 'white' : 'white'}
    />
};

export default CustomBtn;