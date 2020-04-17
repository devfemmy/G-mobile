import React, {useEffect, useState} from 'react';
import {View, Alert, StyleSheet, AsyncStorage, ScrollView, SafeAreaView, ActivityIndicator} from 'react-native';
import Swipeout from 'react-native-swipeout';
import NotificationCard from '../../Components/NotificationCard';
import axios from '../../axios.req';
import EventIndicator from '../../Components/EventIndicator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../Navigation/DrawerNav';

const NotificationPage = (props) => {
    const [notification, setNotification] = useState('');
    const [loader, setLoader] = useState(false);
    const { signOut} = React.useContext(AuthContext);
    var swipeoutBtns = [
        {
            text: 'Delete',
            type: 'delete',
            backgroundColor: 'red',
            onPress: () => {alert('delete')}
        }
      ]
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
               
                axios.get('notifications', {headers: {Authorization: res}})
                .then(
                    res => {
                        console.log("notifications", res)
                        const response = res.data.notifications;
                        const notification = response.data;
                        setNotification(notification);
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
        

      });
      let showNotification = (
          <View>
              <EventIndicator color = "#000075" />
          </View>
      )
      if (loader) {
          showNotification = (
              <View>
                <View>
               {notification.map(
                          (notify, index) => {
                            if (notify.Note_open === 0) {
                                return(
                                    <View key= {index}>
                                    <TouchableOpacity onPress= {() => 
                                        {  props.navigation.navigate('Display', {
                                            notificationId: notify.User_notification_id
                                        })}
                                        }>
                                    <NotificationCard
                                    date={notify.Creation_date}
                                    title={notify.Transaction_type}
                                    image= {require('../../assets/unread.png')} 
                                    imageBell={require('../../assets/notification.png')} />
                                    </TouchableOpacity>
   
                                    </View>
  
                                )
                            }else {
                                return(
                                    <View key= {index}>
                                    {/* <Swipeout backgroundColor="white" 
                                    sensitivity= {100}
                                    right={swipeoutBtns}> */}
                                    <TouchableOpacity onPress= {() => 
                                           {props.navigation.navigate('Display', {
                                            notificationId: notify.User_notification_id
                                        })}
                                        }>
                                        <NotificationCard
                                        date={notify.Creation_date}
                                        title={notify.Transaction_type} 
                                        image= {require('../../assets/read.png')} 
                                        bg= "rgba(0, 0, 0, 0.116)" />
                                    </TouchableOpacity>
                                    {/* </Swipeout> */}
                                    </View>
                                )
                            }
                      
                   
                          }
                      )}
              </View>
            </View>
          )
      }
    return (
       <ScrollView style = {styles.screen}>
           <SafeAreaView>
               {/* <Swipeout backgroundColor = "none"> */}
            <View>
                {showNotification}
               </View>
               {/* </Swipeout> */}

           </SafeAreaView>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default NotificationPage