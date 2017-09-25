import React from 'react';
import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  WebView,
} from 'react-native';

var DEFAULT_URL = 'http://rem.komica2.net/00b/index.htm';

const injectJSCode = `
  // remove un-used areas.
  document.querySelectorAll('#toplink,#postform,center,.top').forEach((e) => e.remove());
`;

export default class App extends React.Component {
  render() {
    return (
      <WebView
        source={{uri: DEFAULT_URL}}
        domStorageEnabled={true}
        injectedJavaScript={injectJSCode}
        javaScriptEnabled={false}
      />
    );
  }
}
