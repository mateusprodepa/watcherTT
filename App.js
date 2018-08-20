import React from 'react';
import { createRootNavigator } from './routes/routes';
import { isSignedIn } from './auth';
import firebase from 'react-native-firebase';

export default class App extends React.Component {

  state = {
    signedIn: false,
    checkedSignIn: false,
    fcm_token: ""
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch((err) => err);
    });
    this.checkPermission();
  }

    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

async createNotificationListeners() {
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
  });

  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }

  this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }

showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken', value);
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        this.getToken();
    } catch (error) {
        console.log('permission rejected');
    }
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if(!checkedSignIn) return null;
    const Layout = createRootNavigator(signedIn);
    return (
      <React.Fragment>
        <Layout />
      </React.Fragment>
    )
  }
}
