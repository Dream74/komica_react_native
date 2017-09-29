
import {
  Platform,
} from 'react-native';


module.exports = {
  ADMOB_BANNDER_AD_UNIT_ID: (Platform.OS === 'ios') ? 'ca-app-pub-5027135397412848/7769242954' : 'ca-app-pub-5027135397412848/2994362769',
  ADMOB_INTERSTITIAL_AD_UNIT_ID: (Platform.OS === 'ios') ? 'ca-app-pub-5027135397412848/8632512885' : 'ca-app-pub-5027135397412848/5120288068',
};
