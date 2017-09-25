import React from 'react';
import {
  View,
  Text,
  WebView,
} from 'react-native';

import AppNavigator from './src/components/AppNavigator';

export default class App extends React.Component {
  render() {
    return (
        <AppNavigator />
    );
  }
}
