import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WishCard = (props) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            // width: '100%',
            maxHeight: 100,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 15,
            borderColor: '#EFEFEF',
            borderWidth: 1,
            borderRadius: 5,
            marginVertical: 15
        },
        imageStyle: {
            height: 50,
            width: 50
        },
        textStyle: {
            color: '#000000',
            fontWeight: 'bold'
        },
        prdContainer: {
            width: '50%'
        },
        textStyle2: {
            color: '#A2A2A2'
        }
    })
    return (
        <>
        <View style= {styles.container}>
            {/* <View style= {styles.container}> */}
                {/* <TouchableOpacity onPress= {props.btnPressed}> */}
                {/* <View> */}
                    <Image source= {props.image} style= {styles.imageStyle} />
                    <View style= {styles.prdContainer}>
                        <Text style= {styles.textStyle}>
                            {props.product}
                        </Text>
                    </View>
                    <View style= {{alignItems: 'flex-end'}}>
                    <Text style= {styles.textStyle2}>
                        {props.price}
                    </Text>
                    <TouchableOpacity onPress= {props.pressed}>
                        <Image style= {{height: 20, width: 20, resizeMode: 'contain', marginTop: 5}} source= {props.deleteImg} />
                    </TouchableOpacity>
                    </View>
                {/* </View> */}
            {/* </TouchableOpacity> */}
        {/* </View> */}
        </View>
        </>

    )
}

export default WishCard