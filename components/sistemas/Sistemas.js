import React, { Component } from "react";
import { View, Text, FlatList, AsyncStorage, StatusBar } from "react-native";
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { USER_KEY, onSignOut } from '../../auth';
import axios from 'axios';

export default class Sistemas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: null,
      loading: false,
      refreshing: false
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: "100%",
          backgroundColor: "#f74d4d",
          marginLeft: "14%"
        }}
      />
    );
  };

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    AsyncStorage.getItem(USER_KEY)
    .then(token => {
      if(token !== null) {
        axios.get("http://10.1.3.59:5000/api/meusSistemas",
        { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          this.setState({
            data: res.data,
            error: res.error || null,
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        })
      }
    })
  };

  componentDidMount() {
    this.makeRemoteRequest();
    this.chamadas = setInterval(this.makeRemoteRequest, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.chamadas);
  }

  render() {
    return (
      <View style={{
          height: '100%',
          width: '100%',
          padding: 0,
          margin: 0
        }}>
        <StatusBar hidden/>
        <Header
          backgroundColor='#ff793f'
          placement="left"
          centerComponent={{ text: 'Meus Sistemas', style: { color: '#fff' } }}
          rightComponent={{
            icon: 'power-settings-new',
            color: '#fff',
            onPress: () => { onSignOut().then(res => this.props.navigation.navigate('Splash')) }
          }}
          />
        <SearchBar placeholder="Procure um sistema..." lightTheme round showLoading />
        <List
          containerStyle={{
            margin: 0,
            padding: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.nome}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                titleStyle={{ color: '#1e2328', fontSize: 16 }}
                subtitleStyle={{ color: item.status === "Online" ? "#2ecc71" : "#c0392b", fontSize: 12, fontWeight: 'bold' }}
                chevronColor="#1e2328"
                chevron
                title={`${item.nome.toUpperCase()}`}
                subtitle={`${item.status}`}
                avatar={{ uri: item.imgUrl }}
                containerStyle={{
                  borderBottomWidth: 1,
                  padding: 4,
                }}
                />
            )}
            />
        </List>
      </View>
    );
  }
}
