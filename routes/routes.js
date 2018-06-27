import Login from '../components/login/login';
import Cadastro from '../components/cadastro/cadastro';
import Splash from '../components/splash/splash';

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

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator({
    screen: SignedOut
  }, {
    initialRouteName: signedIn ? "" : "SignedOut"
  })
}
