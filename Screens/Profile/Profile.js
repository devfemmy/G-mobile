import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfilePage = () => {
    return (
        <View style = {styles.screen}>
            <Text>Profile Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProfilePage