import React, {Component} from 'react';
// import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";





const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
            modalVisible: false
        }
        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use((res) => {
                if (res.status === 401) {
                    // auth.logout(() => {
                    //     this.props.props.props.history.push("/");
                    // });
                }
                return res;
            }, (error) => {
                console.log ("this error",)
               this.setState({error: error})  
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);

        }
        removeErrorHandler = () => {
            this.setState({error: null})
        }
        render() {
            let showErrorModal = null;
            if (this.state.error) {
                showErrorModal = (
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={true}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                        {this.state.error ? this.state.error.message : null}
                        </Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={this.removeErrorHandler}
                            >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                    </TouchableHighlight>
                    </View>
                    </View>
                </Modal>
                )
            }
            // const { addToast } = useToasts()
            return (
                <View>
                    {showErrorModal}
                <WrappedComponent {...this.props}/>
                </View>
                 
            )
        }
       
    } 
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  
  

export default errorHandler;