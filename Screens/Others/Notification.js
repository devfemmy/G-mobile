import React, {useEffect, useState} from 'react';
import {View, Alert, StyleSheet, AsyncStorage, ScrollView, SafeAreaView, ActivityIndicator} from 'react-native';
// import Swipeout from 'react-native-swipeout';
import NotificationCard from '../../Components/NotificationCard';
import axios from '../../axios.req';
import EventIndicator from '../../Components/EventIndicator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../Navigation/DrawerNav';

const NotificationPage = (props) => {
    const [notification, setNotification] = useState('');
    const [loader, setLoader] = useState(false);
    const { signOut} = React.useContext(AuthContext);
    
    // var swipeoutBtns = [
    //     {
    //         text: 'Delete',
    //         type: 'delete',
    //         backgroundColor: 'red',
    //         onPress: () => {alert('delete')}
    //     }
    //   ]
    const fetchNotifications = () => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
               
                axios.get('notifications', {headers: {Authorization: res}})
                .then(
                    res => {
                        console.log("notifications", res)
                        const response = res.data;
                        const notification = response.data;
                        // console.log("notify", notification)
                        setNotification(notification);
                        setLoader(true)
                       
                    }
                )
                .catch(err => {
                    setLoader(true)
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
      }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            fetchNotifications()
            // console.log('SCREEN FOCUSED')
          });

        
        return unsubscribe;
      }, [props.navigation]);

      const alertUser = (id) => {
        Alert.alert(
            'Delete Item!',
            'Are you sure you to delete Notification?',
            [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {text: 'OK', onPress: () => proceedToDelete(id)},
            ],
            { cancelable: false }
          )
      }
      const proceedToDelete = (code) => {
        //   setLoading(true)
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
                const data = {
                }
                axios.post(`notifications/${code}`, data,  {headers: {Authorization: res}})
                .then(
                    res => {  
                     
        
                        const message = res.data.message; 
                        alert(message);
                        fetchNotifications()
                       
                       
                    }
                )
                .catch(err => {
                //   setShowBtn2(true)
                    console.log(err.response, "error")
                    // setLoading(false)
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
                        // setShowBtn(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK'},
                            ],
                            { cancelable: false }
                          )
                    }
  
                      
                
  
                })
            }
        )
        .catch( err => {console.log(err)})
      }
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
                                    {/* <TouchableOpacity> */}
                                        <NotificationCard
                                        read= {() => 
                                            {props.navigation.navigate('Display', {
                                             notificationId: notify.User_notification_id
                                         })}
                                         }
                                        pressed = {() => alertUser(notify.User_notification_id)}
                                        date={notify.Creation_date}
                                        title={notify.Transaction_type} 
                                        image= {require('../../assets/read.png')} 
                                        imageBell={require('../../assets/delete.png')}
                                        bg= "rgba(0, 0, 0, 0.116)" />
                                    {/* </TouchableOpacity> */}
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