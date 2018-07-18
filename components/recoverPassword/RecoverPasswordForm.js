import React, { Component } from 'react';
import axios from 'axios';
import {
  StyleSheet, View, Image, Text, TextInput, Button, StatusBar, TouchableOpacity, Alter
} from 'react-native';

class RecoverPasswordForm extends Component{
    state = {
      email: '',
      errors: {}
    }

    render() {
      return (
        <View style={ styles.box }>
          <StatusBar
            backgroundColor="#ffa502"
            barStyle="light-content"/>

          <Text
            style={ styles.label }>Email</Text>
          <TextInput
            placeholder="Insira o seu email"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            underlineColorAndroid='transparent'
            returnKeyType="go"
            onChangeText={email => this.setState({ email })}
            keyboardType="email-address"
            value={this.state.email}
            style={ styles.input }/>

          <Button
            title="Entrar"
            raised={true}
            color="#ffa502"
            style={ styles.btn }
            onPress={() => this.submitData(this.state)}/>

          <View
            style={ styles.subTitles }>
            <TouchableOpacity onPress={ () => this.props.nav.navigate('Cadastro') }>
              <Text style={ styles.subTitle }>Faça seu cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.props.nav.navigate('Login')}>
              <Text style={ styles.subTitle }>Já possui uma conta?</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 300,
    backgroundColor: '#ff793f',
    padding: 32,
    borderRadius: 8,
  },
  logo: {
    width: '40%',
    height: 140,
    marginTop: 80,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 250,
    margin: 4,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    paddingLeft: 4,
    borderWidth: 0.5,
    borderColor: '#ffa502',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff'
  },
  label: {
    fontSize: 15,
    color: '#ffffff',
  },
  subTitles: {
    padding: 8,
  },
  subTitle: {
    color: '#f3f3f3',
    textAlign: 'center',
  },
  btn: {
    marginBottom: 5,
  }
});

export default RecoverPasswordForm;
