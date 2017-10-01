import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class SwitchPage extends React.Component {
  render() {
    const { baseUrl, forwardUrl, nextUrl, onPress } = this.props;

    if (forwardUrl === undefined && nextUrl === undefined) {
      return null;
    }

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}
          onPress={() => {
            if (forwardUrl !== undefined) {
              console.log(forwardUrl);
              if (onPress) onPress(baseUrl + forwardUrl);
            }
          }}
          disabled={!forwardUrl}
        >
          <Text style={{ color: (!forwardUrl) ? '#3c4b63' : 'white', fontSize: 25 }}>上一頁</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}
          onPress={() => {
            if (nextUrl !== undefined) {
              console.log(forwardUrl);
              if (onPress) onPress(baseUrl + nextUrl);
            }
          }}
          disabled={!nextUrl}
        >
          <Text style={{ color: (!nextUrl) ? '#3c4b63' : 'white', fontSize: 25 }}>下一頁</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


SwitchPage.propTypes = {
  baseUrl: PropTypes.string,
  forwardUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  onPress: PropTypes.func,
};

SwitchPage.defaultProps = {
  baseUrl: '',
  forwardUrl: undefined,
  nextUrl: undefined,
  onPress: undefined,
};
