import Login from '../components/login/login';
import Cadastro from '../components/cadastro/cadastro';
import Splash from '../components/splash/splash';
import Sistemas from '../components/sistemas/Sistemas';

import { Platform, StatusBar } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

const stackConfig = {
  initialRouteName: 'Splash',
  header: null,
}

export const SignedOut = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      title: "Tela inicial",
      headerMode: "none",
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Logar",
      headerMode: "none",
    }
  },
  Cadastro: {
    screen: Cadastro,
    navigationOptions: {
      title: "Cadastre-se",
      headerMode: "none",
    }
  },
}, { headerMode: "none" });

export const SignedIn = createStackNavigator({
  Sistemas: {
    screen: Sistemas,
    navigationOptions: {
      title: "Meus Sistemas",
      headerMode: "none",
    }
  },
}, { headerMode: "none" });

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator({
    SignedIn: SignedIn,
    SignedOut: SignedOut
  }, {
    initialRouteName: signedIn ? "SignedIn" : "SignedOut"
  })
}
