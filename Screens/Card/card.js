import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyCard = (props) => {
    return (
        <View style={styles.container}>
            <View style= {styles.homeContainer}>
                <Text style= {styles.inputText}>
                    How do you want to scan?
                </Text>
                <View>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Qrcode')}>
                        <Image style= {styles.imageSize} source={require('../../assets/qrcode.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => props.navigation.navigate('Barcode')}>
                        <Image style= {styles.imageSize} source={require('../../assets/barcode.png')} />
                    </TouchableOpacity>
                  
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: '8%'
    },
    inputText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    homeContainer: {
        marginVertical: 40,
    },
    imageSize: {
        width: '100%',
        height: 200,
        marginVertical: 15
    }
});

export default MyCard;

