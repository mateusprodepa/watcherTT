import React from 'react';
import Logo from '../../assets/img/nfprod-04.png';
import RecoverPasswordForm from './RecoverPasswordForm';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native';

export default ({ navigation }) => {
    return (
      <KeyboardAvoidingView behavior="padding" style={ styles.container }>
        <Image source={ Logo }
        resizeMode="contain"
        style={ styles.logo }/>
      <RecoverPasswordForm
        nav={ navigation }/>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '40%',
    height: 140,
    marginTop: 80,
    marginBottom: 20,
  },
});
