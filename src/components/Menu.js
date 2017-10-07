import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SectionList,
  View,
  Dimensions,
} from 'react-native';

import {
  AdMobBanner,
} from 'react-native-admob';

import { komica_board } from '../config/board';
import { ADMOB_MENU_BANNDER_AD_UNIT_ID } from '../config/ads';
import { backgroundColor } from '../styles/GlobalStyles';

const styles = StyleSheet.create({
  sectionHeader: {
    color: '#a1fbe2',
    fontSize: 32,
  },
});

const ItemView = onItemSelected => ({ item }) => (
  <TouchableOpacity
    onPress={() => { onItemSelected(item); }}
    style={{
      justifyContent: 'center',
      height: 50,
      marginBottom: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#424242',
    }}
  >
    <Text style={{
      fontSize: 25,
      color: 'white',
    }}
    >{item.title}</Text>
  </TouchableOpacity>
);

export default function Menu({ onItemSelected }) {
  const { height } = Dimensions.get('window');
  return (
    <View style={{ flex: 1, backgroundColor }}>
      <AdMobBanner
        bannerSize={(height >= 500) ? 'mediumRectangle' : 'largeBanner'}
        testDeviceID="EMULATOR"
        adUnitID={ADMOB_MENU_BANNDER_AD_UNIT_ID}
        adViewDidReceiveAd={() => { console.log('AdMobBanner', 'adViewDidReceiveAd'); }}
        didFailToReceiveAdWithError={(e) => { console.log('AdMobBanner', 'didFailToReceiveAdWithError', e); }}
      />

      <SectionList
        sections={komica_board}
        renderItem={ItemView(onItemSelected)}
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.category}</Text>}
      />
    </View>

  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
