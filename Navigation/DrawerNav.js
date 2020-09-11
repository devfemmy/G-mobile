import * as React from 'react';
import {StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './Navigators/HomeNavigator';
import ProfileNavigator from './Navigators/ProfileNavigator';
import NotificationNavigator from './Navigators/NotificationNavigator';
import StatementNavigator from './Navigators/StatementNavigator';
import ChangePasNavigator from './Navigators/ChangePasNavigator';
import axios from 'axios';
import LoginNavigator from './Navigators/LoginNavigator';
import LoginPage from '../Screens/Login';
import CustomDrawerContent from './Navigators/CustomDrawer';
import EventIndicator from '../Components/EventIndicator';
import CardNavigator from './Navigators/CardNavigator';
import {Ionicons} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CatalogNavigator from './Navigators/CatalogNavigator';



export const AuthContext = React.createContext();
const Drawer = createDrawerNavigator();
const DrawerNav = (props) => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
      );
    
      React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
        console.log('USER', userToken)
          try {
            userToken = await AsyncStorage.getItem('userToken');
            console.log('what is', userToken)
            // loggedIn = await AsyncStorage.getItem('LoggedIn');
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
    
        bootstrapAsync();
      }, []);
    
      const authContext = React.useMemo(
        () => ({
          signIn: async data => {
                dispatch({ type: 'SIGN_IN', token: data });
           
       
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token
            await AsyncStorage.setItem('LoggedIn', '0');
            const login = AsyncStorage.getItem('LoggedIn')
            console.log('33', login)
    
           
          },
          signOut: async () => {
            await AsyncStorage.setItem('LoggedIn', '1');
            const logout = AsyncStorage.getItem('LoggedIn')
            console.log('34', logout)
          dispatch({ type: 'SIGN_OUT' })
        },
          signUp: async data => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token
    
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
        }),
        []
      );
      console.log('usertoken7', state.userToken)
   
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
            <Drawer.Navigator
           drawerContent={props => <CustomDrawerContent {...props} />}
            drawerContentOptions= {
                {
                    activeTintColor: 'white',
                    labelStyle: {
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        
                    }
                }
            }
            drawerStyle= {{
                backgroundColor: '#000075',
                paddingVertical: 20
            }} 
            drawerType= 'slide' initialRouteName="Log Out">
                        {state.userToken == null ? (
          <Drawer.Screen name="Log In" component={LoginNavigator}
          options = {{
            animationTypeForReplace: state.isSignout ? 'pop' : 'push'
          }}
          />
        ) : (
          <>
                  <Drawer.Screen name="Home" component={HomeNavigator} options= {{
                       drawerIcon: config => <Ionicons
                       size={22}
                       color= "white"
                       name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}></Ionicons>
                    }} />
                    <Drawer.Screen name="Profile" component={ProfileNavigator}
                     options= {{
                      drawerIcon: config => <Ionicons
                      size={22}
                      color= "white"
                      name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}></Ionicons>
                    }}
                    />
                    <Drawer.Screen name="Catalogue" component={CatalogNavigator}
                     options= {{
                      drawerIcon: config => <Ionicons
                      size={22}
                      color= "white"
                      name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}></Ionicons>
                    }}
                    />
                    <Drawer.Screen name="Notification" component={NotificationNavigator}
                       options= {{
                        drawerIcon: config => <Ionicons
                        size={24}
                        color= "white"
                        name={Platform.OS === 'android' ? 'md-notifications' : 'ios-notifications'}></Ionicons>
                    }}
                    />
                    <Drawer.Screen name="Statement" component={StatementNavigator}
                       options= {{
                        drawerIcon: config => <Icon
                        size={20}
                        color= "white"
                        name={Platform.OS === 'android' ? 'account-badge-alert' : 'account-badge-alert'}></Icon>
                      }}
                    />
                    <Drawer.Screen name="Security" component={ChangePasNavigator}
                     options= {{
                      drawerIcon: config => <Icon
                      size={22}
                      color= "white"
                      name={Platform.OS === 'android' ? 'security' : 'security'}></Icon>
                      }}
                    />
                    <Drawer.Screen name="My Card" component={CardNavigator}
                     options= {{
                      drawerIcon: config => <Ionicons
                      size={22}
                      color= "white"
                      name={Platform.OS === 'android' ? 'md-card' : 'ios-card'}></Ionicons>
                    }}
                    />

                    {/* <Drawer.Screen name="Log Out" component={LoginPage} /> */}
          </>
        )}
        
                   
            </Drawer.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
const styles = StyleSheet.create({
    imageStyle: {
        width: 20,
        height: 20
    }
})

export default DrawerNav;