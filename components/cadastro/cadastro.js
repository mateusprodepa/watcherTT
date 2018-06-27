import React from 'react';
import CadastroForm from './CadastroForm';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

export default ({ navigation }) => {
    return (
      <KeyboardAvoidingView behavior="padding" style={ styles.container }>
        <CadastroForm
          nav={ navigation }/>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1e3',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
