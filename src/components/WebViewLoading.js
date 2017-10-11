import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  AdMobBanner,
} from 'react-native-admob';

import { ADMOB_LOADING_BANNDER_AD_UNIT_ID } from '../config/ads';

export default class WebViewLoading extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <AdMobBanner
          bannerSize="mediumRectangle"
          testDeviceID="EMULATOR"
          adUnitID={ADMOB_LOADING_BANNDER_AD_UNIT_ID}
          didFailToReceiveAdWithError={(e) => { console.log('AdMobBanner', 'didFailToReceiveAdWithError', e); }}
        />

        <Text style={{
          fontSize: 24,
          padding: 30,
          color: '#a1fbe2',
        }}
        >正在載入中</Text>

      </View>);
  }
}
