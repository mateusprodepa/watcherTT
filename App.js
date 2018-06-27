import React from 'react';
import { createRootNavigator } from './routes/routes';
import { isSignedIn } from './auth';

export default class App extends React.Component {

  state = {
    signedIn: true,
    checkedSignIn: true,
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.state({ signedIn: res, checkedSignIn: true }))
      .catch((err) => err);
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if(!checkedSignIn) return null;
    const Layout = createRootNavigator(signedIn);
    return <Layout />
  }
}
