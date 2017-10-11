import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Button,
} from 'react-native';

export default class WebViewFail extends React.Component {
  render() {
    const { onError } = this.props;

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Text style={{
          fontSize: 16,
          paddingBottom: 30,
          color: '#a1fbe2',
        }}
        >網路連線失敗，請檢查網路狀態後再重新整理</Text>

        <View style={{
          backgroundColor: '#a1fbe2',
        }}
        >
          <Button
            title="重新整理"
            onPress={onError}
            color="black"
          />
        </View>
      </View>);
  }
}

WebViewFail.propTypes = {
  onError: PropTypes.func,
};
