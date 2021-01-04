import React, {useEffect, useState} from 'react';
import {View, Text, AsyncStorage, 
    RefreshControl,
    Alert,
    StyleSheet, ScrollView , SafeAreaView} from 'react-native';
import StatementCard from '../../Components/StatementCard';
import axios from '../../axios.req';
import EventIndicator from '../../Components/EventIndicator';
import { AuthContext } from '../../Navigation/DrawerNav';

// function wait(timeout) {
//     return new Promise(resolve => {
//       setTimeout(resolve, timeout);
//     });
//   }

const StatementPage = () => {
    const { signOut} = React.useContext(AuthContext);
    const [statements, setStatement] = useState('');
    const [loaded, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
           (res) => {
               const data = {

               }
                axios.post('statement', data, {headers:{Authorization:res}})
                .then(
                    res => {
                        console.log("statement", res)
                        const response = res.data;
                        const statement = response.user_statements.data;
                        setStatement(statement)
                        // const response = res.data.notifications;
                        // const notification = response.data;
                        // setNotification(notification);
                        setLoader(true)
                       
                    }
                )
                .catch(err => {
                    const code = err.response.status;
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [
                              {text: 'OK', onPress: () => signOut()},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                        setLoader(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () =>   setLoader(true)},
                            ],
                            { cancelable: false }
                          )
                    }
                })
            }
        )
        .catch( err => {console.log(err)}) 
        

      }, []);
    //   const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    
    //     wait(2000).then(() => setRefreshing(false));
    //   }, [refreshing]);
    //   const forceUpdateHandler = () => {
    //       this.forceUpdate()
    //   }
    let showStatement = <EventIndicator color= "#000075" />
    if (loaded) {
        showStatement = (
            statements.map((statement, index) => {
                console.log('statements', statement)
                const stringedDate = statement.Transaction_date.slice(0, 10)
                const myDate = new Date(stringedDate);
                const day = myDate.getDate();
                const mm = myDate.getUTCMonth();
                var month = [];
                    month[0] = "January";
                    month[1] = "February";
                    month[2] = "March";
                    month[3] = "April";
                    month[4] = "May";
                    month[5] = "June";
                    month[6] = "July";
                    month[7] = "August";
                    month[8] = "September";
                    month[9] = "October";
                    month[10] = "November";
                    month[11] = "December";
                const newMonth = month[mm]
                const year = myDate.getFullYear();
                const displayDate = `${newMonth} ${day}, ${year}`;
                if (statement.Points_gained !== "-") {
                   return (
                    <View key= {index} >
                        <StatementCard
                        transDes = {statement.Description}
                        date = {displayDate}
                        figure= {statement.Points_gained}
                        desc= {statement.Transaction_type} 
                        bg= "white"
                        color= "#00b700"
                        image={require('../../assets/accumulation.png')} />
                    </View>
                   ) 
                }else {
                    return (
                        <View key= {index} >
                        <StatementCard
                        transDes = {statement.Description}
                        date =  {displayDate}
                        figure= {statement.Points_used}
                        desc= {statement.Transaction_type} 
                        bg= "rgba(220, 222, 233, 0.301)"
                        color= "#ea0000"
                        image={require('../../assets/redemption.png')}/>
                    </View>
                    )
                }
            })
        

             
          
        )
    }
    return (
        <ScrollView 
        // refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        //   }
        style = {styles.screen}>
            <SafeAreaView>
            <View>
                {showStatement}
               
            </View>
            </SafeAreaView>
       
         
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    
    },
 
})

export default StatementPage;