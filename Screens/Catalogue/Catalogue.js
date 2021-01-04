import React, { Component } from 'react';
import { View, Text,Alert, FlatList,AsyncStorage, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import axios from '../../axios.req';
import CatalogCard from '../../Components/CatalogCard';
class Catalogue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      value: '',
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      this.makeRemoteRequest();
      console.log('request made')
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
    console.log('request unmounted')
  }

  makeRemoteRequest = () => {
    // const url = `http://demoperxapi.perxclm.com/perx/public/api/categories`;
    this.setState({ loading: true });

    const id = AsyncStorage.getItem('Mytoken').then(
        res => {
           
            axios.get('categories', {headers: {Authorization: res}})
            .then(
                res => {
                    this.setState({ loading: false });
                    console.log("catalogue", res.data.categories.categories)
                    const data = res.data.categories.categories;
                    this.setState({data: data})
                    // const profile = res.data.profile;
                    this.arrayholder = res.data.categories.categories;
                   
                }
            )
            .catch(err => {
              this.setState({ loading: false });
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
                  this.setState({ loading: false });
                    Alert.alert(
                        'Network Error',
                        'Please Try Again',
                        [
                          {text: 'OK', onPress: () => this.setState({ loading: false })},
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
      const itemData = `${item.Merchandize_category_name.toUpperCase()}`;
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
        placeholder="Search Catalogue..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <ActivityIndicator  size="large" color="#51087E" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, marginTop: 30, paddingHorizontal: '8%' }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            // <ListItem
            // onPress= {() => this.props.navigation.navigate('Login')}
            //   leftAvatar={{ source: { uri: item.image} }}
            //   title={`${item.Merchandize_category_name}`}
            // />
            <CatalogCard pressed= {() => this.props.navigation.navigate('ItemDisplay',
            {name: item.Merchandize_category_name, item_id: item.Merchandize_category_id})} 
            product= {item.Merchandize_category_name} />
          )}
          keyExtractor={item => item.Merchandize_category_id}
        //   ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default Catalogue;