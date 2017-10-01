import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class WebViewGoback extends React.Component {
  render() {
    const { onPress } = this.props;
    return (
      <View style={{
        flexDirection: 'row',
        padding: 10,
      }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}
          onPress={() => { onPress(); }}
        >
          <Text style={{ color: 'white', fontSize: 25 }}>返回看板</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
