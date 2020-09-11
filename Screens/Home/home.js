import React from 'react';
import { View, StyleSheet, ScrollView,AsyncStorage, 
    SafeAreaView, Text, ImageBackground, Image } from 'react-native';
import Cards from '../../Components/cards';
import HomeCard from '../../Components/HomeCard';


const Home = () => {
    const [memberId, setMembershipId] = React.useState('');
    const [firstname, setFirstName] = React.useState('');
    const [currentBal, setCurrentBal] = React.useState('');
    const [Blockedpts, setBlockedPts] = React.useState('');

    const firstLetter = firstname.charAt(0);
    const fixedBal = parseInt(currentBal)
    const fixedPts = parseInt(Blockedpts)

    const id = AsyncStorage.getItem('membershipId').then(
        res => {
           setMembershipId(res)
        }
      ).catch(err => console.log(err));
      const name = AsyncStorage.getItem('firstname').then(
       res => {
          setFirstName(res)
       }
     ).catch(err => console.log(err));
     const bal = AsyncStorage.getItem('currentBal').then(
       res => {
          setCurrentBal(res)
   
       }
     ).catch(err => console.log(err));

     const pts = AsyncStorage.getItem('blockedpts').then(
        res => {
           setBlockedPts(res)
    
        }
      ).catch(err => console.log(err));

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
                                    <Text style= {styles.textStyle}>
                                        {firstLetter}
                                    </Text>
                                    </View>
                                    <View style= {styles.textsDiv}>
                                        <Text style= {styles.textStyle2}>
                                            {firstname}
                                        </Text>
                                        <Text style= {styles.textStyle3}>
                                            Membership ID: {memberId}
                                        </Text>
                                    </View>
                                    
                                </View>
                            </View>
                        </ImageBackground>
                        </View>
                        <View style= {styles.cardDiv}>
                            <Cards 
                            imageUrl= {require('../../assets/current-bal-icon.png')}
                            balance= "Current Balance:" 
                            figure = {fixedBal} />
                            <Cards 
                             imageUrl= {require('../../assets/points-gained-icon.png')}
                            balance= "Blocked Points" 
                            figure = {fixedPts} />
                        </View>
                        <View style= {styles.recentlyViewed}>
                            <Text style= {styles.textRecent}>MOST REDEEMED ITEMS</Text>
                            <HomeCard 
                            price= "4083 Points"
                            product= "Sunlight 2in1 Hand Washing Powder 2Kg"
                            image= {require('../../assets/product.png')} />
                            <HomeCard 
                            price= "4083 Points"
                            product= "Sunlight 2in1 Hand Washing Powder 2Kg"
                            image= {require('../../assets/product.png')} />
                            <HomeCard 
                            price= "4083 Points"
                            product= "Sunlight 2in1 Hand Washing Powder 2Kg"
                            image= {require('../../assets/product.png')} />
                            <HomeCard 
                            price= "4083 Points"
                            product= "Sunlight 2in1 Hand Washing Powder 2Kg"
                            image= {require('../../assets/product.png')} />
                        </View>
                       
                    </View>
            </SafeAreaView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F3F4FC',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        
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
        marginVertical: 150
    },
    textRecent: {
        fontSize: 16,
        color: '#939393'
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
        marginVertical: 10,
        marginLeft: 20,
        
    },
    cardDiv: {
        marginVertical: 30
    },
    imageStyle: {
        width: '100%',
        height: 300,
        resizeMode: 'cover'
    },
    innerImg: {
        width: 110,
        height: 20

    }
})

export default  Home;