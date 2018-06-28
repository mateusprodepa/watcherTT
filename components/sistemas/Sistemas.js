import React, { Component } from "react";
import { View, Text, FlatList, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { USER_KEY } from '../../auth';
import axios from 'axios';

export default class Sistemas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      page: 1,
      seed: 1,
      error: null,
      loading: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Procure um sistema..." lightTheme showLoading />;
  };

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    this.setState({ loading: true });
    AsyncStorage.getItem(USER_KEY)
    .then(token => {
      if(token !== null) {
        axios.post("http://192.168.1.7/api/sistemas", token)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: page === 1 ? res.results : [...this.state.data, ...res.results],
            error: res.error || null,
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
      }
    })
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor='#ff793f'
          placement="left"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Meus Sistemas', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <List
          containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.email}
            ListHeaderComponent={this.renderHeader}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0 }}
                />
            )}
            />
        </List>
      </View>
    );
  }
}
