import React, {useEffect, useState} from 'react';
// import { ScrollView, Dimensions } from 'react-native';
import { View, StyleSheet, Text, 
    AsyncStorage,
    Alert,
    Dimensions, 
    ScrollView, SafeAreaView } from 'react-native';
    // import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import { WebView } from 'react-native-webview';
import { IGNORED_TAGS, alterNode, makeTableRenderer } from 'react-native-render-html-table-bridge';
import axios from '../../axios.req';
import EventIndicator from '../../Components/EventIndicator';
import HTML from 'react-native-render-html';
import { AuthContext } from '../../Navigation/DrawerNav';


const ViewNotification = (props) => {
    const { signOut} = React.useContext(AuthContext);
    const { notificationId } = props.route.params;
    const [notification, setNotification] = useState('');
    const [loader, setLoader] = useState(false)
    const stringedhtml = notification.toString();
    const addedString = ` ${stringedhtml} `
    const html = `${notification}`;

    console.log('STRING', addedString, typeof(stringedhtml))
    useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
               
                axios.get(`notifications/${notificationId}`, {headers:{Authorization:res}})
                .then(
                    res => {
                        console.log("view", res)
                        const notification = res.data.Contents;
                        setNotification(notification);
                        setLoader(true)
                       
                    }
                )
                .catch(err => {
                    console.log(err)
                })
            }
        )
        .catch( err => {
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
        

      });
      
      let renderData = <EventIndicator color= "#000075" />
      if (loader) {
        const config = {
            WebViewComponent: WebView
        };
        
        const renderers = {
          table: makeTableRenderer(config)
        };
        
        const htmlConfig = {
          alterNode,
          renderers,
          ignoredTags: IGNORED_TAGS
        };
          
          renderData = (
            <HTML html={html} {...htmlConfig}/>
          )
      
  
                
  
      }
    return (
        <ScrollView style= {styles.container}>
            <SafeAreaView>
                    {renderData}
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: '5%'
    }
})

export default ViewNotification;