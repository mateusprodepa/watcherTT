import React from 'react';
import axios from 'axios';
import { StyleSheet, View, Image, Text, TextInput, Button, StatusBar, TouchableOpacity, Picker } from 'react-native';

class cadastroForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      cnfPass: '',
      email: '',
      setor: 'gti',
      matricula: '',
      errors: {}
    }
  }

  key(obj, val) { for(var chave in obj) { if(obj[chave] === val && obj.hasOwnProperty(chave)) return chave; }}

  submitData(data) {
    console.warn(data);
    for(var w in data) {
      if(data[w].length === 0 || '' && this.key(data, data[w] !== 'errors')) {
        const identificador = Object.keys(data).find(i => i === this.key(data, data[w]));
        return this.setState({ errors: { ...this.state.errors, campoEmBranco: `${identificador} não pode ficar vazio` }});
      };
    }

    axios.post('http://192.168.1.7:3000/api/auth', data)
    .then(res => console.warn(res.data))
    .catch(err => console.warn(err));
  }

  render() {
    return (
      <View style={ styles.box }>
        <StatusBar
          backgroundColor="#ffa502"
          barStyle="light-content"/>

        <Text
          style={ styles.label }>Nome</Text>
        <TextInput
          placeholder="Insira o seu nome completo"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          underlineColorAndroid='transparent'
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={login => this.setState({ login })}
          keyboardType="email-address"
          value={this.state.login}
          style={ styles.input }/>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Picker
            selectedValue={this.state.setor}
            style={ styles.picker }
            onValueChange={setor => this.setState({ setor })}>
            <Picker.Item label="GTI" value="gti" />
            <Picker.Item label="GPE" value="gpe" />
          </Picker>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={ styles.label }>Matricula</Text>
            <TextInput
              placeholder="Insira a sua matricula"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              underlineColorAndroid='transparent'
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              onChangeText={matricula => this.setState({ matricula })}
              keyboardType="email-address"
              value={this.state.matricula}
              style={ styles.input2 }/>
          </View>
        </View>
        <Text
          style={ styles.label }>Email</Text>
        <TextInput
          placeholder="Insira o seu email"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          underlineColorAndroid='transparent'
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={email => this.setState({ email })}
          keyboardType="email-address"
          value={this.state.email}
          style={ styles.input }/>
        <Text
          style={ styles.label }>Senha</Text>
        <TextInput
          placeholder="Insira a sua senha"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          underlineColorAndroid='transparent'
          returnKeyType="next"
          value={this.state.password}
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          onChange={this.onChangeText}
          ref={i => this.passwordInput = i}
          style={ styles.input }/>
        <Text
          style={ styles.label }>Digite sua senha novamente</Text>
        <TextInput
          placeholder="Confirme sua senha"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          underlineColorAndroid='transparent'
          returnKeyType="go"
          value={this.state.cnfPass}
          secureTextEntry
          onChangeText={cnfPass => this.setState({ cnfPass })}
          onChange={this.onChangeText}
          ref={i => this.passwordInput = i}
          style={ styles.input }/>
        <Button
          title="Registrar"
          raised={true}
          color="#ffa502"
          style={{ marginTop: '10px' }}
          onPress={() => this.submitData(this.state)}/>
        <View
          style={ styles.subTitles }>
          <TouchableOpacity>
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
    height: '100%',
    width: '100%',
    backgroundColor: '#ff793f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
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
  input2: {
    height: 40,
    width: 148,
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
  picker: {
    height: 50,
    width: 90,
    margin: 0,
    color: '#ffffff',
  }
});

export default cadastroForm;
