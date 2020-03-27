import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, ImageBackground, Image } from 'react-native';
import Cards from '../../Components/cards';

const Home = () => {
    return (
        <ScrollView style = {styles.screen}>
            <SafeAreaView>
                    <View style= {styles.homeScreen}>
                        <View style= {styles.bgDiv}>
                        <ImageBackground
                        imageStyle={{ borderRadius: 15 }} 
                        style= {styles.imageStyle} 
                        source= {require('../../assets/homebg.png')}>
                            <View style= {styles.innerDiv}>
                                <Image style= {styles.innerImg} source={require('../../assets/logo-white.png')} />

                                <View style= {styles.profileDiv}>
                                    <View style= {styles.circularDiv}>
                                    <Text style= {styles.textStyle}>O</Text>
                                    </View>
                                    <View style= {styles.textsDiv}>
                                        <Text style= {styles.textStyle2}>
                                            Oluwafemi
                                        </Text>
                                        <Text style= {styles.textStyle3}>
                                            Membership ID: 321567
                                        </Text>
                                    </View>
                                    
                                </View>
                            </View>
                        </ImageBackground>
                        </View>
                        <View style= {styles.cardDiv}>
                            <Cards 
                            imageUrl
                            balance= "Current Balance:" 
                            figure = "12344566" />
                            <Cards 
                            imageUrl
                            balance= "Available Balance:" 
                            figure = "12344566" />
                        </View>
                       
                    </View>
            </SafeAreaView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: '8%',
        paddingRight: '8%'
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    textsDiv: {
        marginVertical: 8
    },
    textStyle2: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    textStyle3: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },

    homeScreen: {
        marginVertical: 15,
        width: '100%'
    },
    profileDiv: {
        marginVertical: 220
    },
    circularDiv: {
        height: 30,
        width: 30,
        backgroundColor: 'white',
        borderRadius: 50,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerDiv: {
        marginVertical: 20,
        marginLeft: 20,
        
    },
    cardDiv: {
        marginVertical: 30
    },
    imageStyle: {
        width: '100%',
        height: 380,
        resizeMode: 'cover'
    },
    innerImg: {
        width: 110,
        height: 20

    }
})

export default Home;