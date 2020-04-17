import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const EventIndicator = (props) => {
    return (
        <View style= {styles.container}>
            <ActivityIndicator size= "large" color={props.color} />
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 100,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EventIndicator;