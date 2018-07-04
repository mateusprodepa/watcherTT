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

  updateStatus = () => {
    setInterval(() => {
      axios.get('http://10.1.3.76:5000/api/sistemasServidor')
      .then(res => {
        let { data } = this.state.data;

        let sistema = data.findOne(dt => dt.nome === res.nome);
        this.setState({
          data: {
            ...this.state.data,
            status: sistema.status
          }
        });
      });
    }, 30000);
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });
    AsyncStorage.getItem(USER_KEY)
    .then(token => {
      if(token !== null) {
        axios.get("http://10.1.3.76:5000/api/meusSistemas",
        { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          this.setState({
            data: [ res.data ],
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
    { this.updateStatus() }
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
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.makeRemoteRequest()
          }}
          centerComponent={{ text: 'Meus Sistemas', style: { color: '#fff' } }}
          rightComponent={{
            icon: 'power-settings-new',
            color: '#cd0000',
            onPress: () => { onSignOut().then(res => this.props.navigation.navigate('Splash')) }
          }}
          />
        <SearchBar placeholder="Procure um sistema..." lightTheme showLoading />
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
