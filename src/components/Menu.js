import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SectionList,
  View,
} from 'react-native';

import {
  AdMobBanner,
} from 'react-native-admob';

import { ADMOB_BANNDER_AD_UNIT_ID } from '../config/ads';
import { backgroundColor } from '../styles/GlobalStyles';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingBottom: 5,
    color: 'white',
  },
  sectionHeader: {
    color: '#a1fbe2',
    fontSize: 32,
  },
});

export default function Menu({ onItemSelected }) {
  return (
    <View style={{ flex: 1, backgroundColor }}>

      <AdMobBanner
        bannerSize="mediumRectangle"
        testDeviceID="EMULATOR"
        adUnitID={ADMOB_BANNDER_AD_UNIT_ID}
        adViewDidReceiveAd={() => { console.log('AdMobBanner', 'adViewDidReceiveAd'); }}
        didFailToReceiveAdWithError={(e) => { console.log('AdMobBanner', 'didFailToReceiveAdWithError', e); }}
      />

      <SectionList
        sections={komica_board}
        renderItem={({ item }) =>
          (<TouchableOpacity
            onPress={() => { onItemSelected(item); }}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>)
        }
        renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.category}</Text>}
        style={{ margin: 10 }}
      />
    </View>

  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
