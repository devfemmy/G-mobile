import React, { Component } from 'react';
import { View, Text,Dimensions,Alert, FlatList,AsyncStorage, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import axios from '../../axios.req';
import CatalogCard from '../../Components/CatalogCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ViewCatalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      value: '',
      error: null,
      total_item: null,
      itemCount: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { item_id } = this.props.route.params;
    // const url = `http://demoperxapi.perxclm.com/perx/public/api/categories`;
    this.setState({ loading: true });

    const id = AsyncStorage.getItem('Mytoken').then(
        res => {
            const data = {
              limit: 20,
              page: 1,
            }
            axios.post(`catalogues/${item_id}`, data, {headers: {Authorization: res}})
            .then(
                res => {
                    this.setState({ loading: false });
                    const items = res.data.items;
                    const arrayLength = items.length;
                    const total_items = res.data.total_items;
                    
                    // const data = res.data.categories.categories;
                    this.setState({data: items, itemCount: arrayLength, total_item: total_items})
                    // const profile = res.data.profile;
                    this.arrayholder = items;
                   
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
                    showLoaded(true)
                    Alert.alert(
                        'Network Error',
                        'Please Try Again',
                        [
                          {text: 'OK', onPress: () => setShowBtn(true)},
                        ],
                        { cancelable: false }
                      )
                }

                  
                  console.log(err.response.status)

            })
        }
    )
    .catch( err => {console.log(err)}) 
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.Item_name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search Products..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
//   _renderItem = ({ item, index }) => (
//     <View style={categorystyles.Category} key={index}>
//         <TouchableOpacity activeOpacity={.5}
//             onPress={() => this.props.navigation.navigate('ListingPerCategory', { catid: item.id })}>
//             {item.category_app_icon ? <Image style={categorystyles.CategoryImg}
//                 source={{ uri: `${item.category_app_icon}` }} /> :
//                 <Image style={categorystyles.CategoryImg}
//                     source={require('../assets/coffeecup.png')} />}
//         </TouchableOpacity>
//         <Text style={{ marginTop: 5 }}>{escape(item.name).replace('%20', ' ').replace('%26amp%3B%20', ' ')}</Text>
//     </View>
// )

  render() {

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <ActivityIndicator  size="large" color="#51087E" />
        </View>
      );
    }
    const styles = StyleSheet.create({
      flexContainer: {
        // maxWidth: Dimensions.get('window').width / 3 - 10, // Width / 3 - (marginLeft and marginRight for the components)
        justifyContent: 'center',
        alignItems:'center', 
        flexDirection: 'row',
        flexWrap: 'wrap',   
        margin:10,
        maxWidth: '100%'
        
      },
      card: {
        backgroundColor: 'white',
        width: '80%',
        // maxWidth: '100%',
        marginVertical: 15,
        minHeight: 250,
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: "#1F1F1F1F",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 5,
      },
      imageStyle: {
        width: '100%',
        height: 200,
        maxHeight: 200,
        resizeMode: 'contain'
      },
      price: {
        color: '#000000',
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'center'
      },
      price2: {
        color: '#A2A2A2',
        marginBottom: 5,
        textAlign: 'center'
      }
    })
    return (
      <View style={{ flex: 1, marginTop: 30, paddingHorizontal: '8%' }}>
        <Text style= {{fontWeight: 'bold', marginBottom: 5}}>Showing {this.state.itemCount} of {this.state.total_item} Item(s)</Text>
        <View>
        <FlatList
          data={this.state.data}
          numColumns= {1}
          renderItem={({ item }) => (
            // <ListItem
            // onPress= {() => this.props.navigation.navigate('Login')}
            //   leftAvatar={{ source: { uri: item.image} }}
            //   title={`${item.Merchandize_category_name}`}
            // />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Product',
            {name: item.Item_name, item_code: item.Item_code,
            price: item.Price, image:item.Item_image
            })}  >
          <View style= {styles.flexContainer}>
              <View style= {styles.card}>
                  <Image style= {styles.imageStyle} 
                  defaultSource= {require('../../assets/placeholder2.png')}
                  source= {{uri: item.Item_image}} />
                  <Text style= {styles.price}>
                      {item.Item_name}
                  </Text>
                  <Text style= {styles.price2}>
                      {`${item.Price} Points`}
                  </Text>
              </View>
          </View>
          </TouchableOpacity>
          )}
          keyExtractor={item => item.Merchandize_category_id}
        //   ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
        </View>
      </View>
    );
  }
}

export default ViewCatalog;