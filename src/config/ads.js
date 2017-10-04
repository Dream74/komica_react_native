
import {
  Platform,
} from 'react-native';


module.exports = {
  ADMOB_BANNDER_AD_UNIT_ID: (Platform.OS === 'ios') ? 'ca-app-pub-5027135397412848/7769242954' : 'ca-app-pub-5027135397412848/2994362769',
  ADMOB_MENU_BANNDER_AD_UNIT_ID: (Platform.OS === 'ios') ? 'ca-app-pub-5027135397412848/1063215879' : 'ca-app-pub-5027135397412848/3510427572',
  ADMOB_LOADING_BANNDER_AD_UNIT_ID: (Platform.OS === 'ios') ? 'ca-app-pub-5027135397412848/2563822190' : 'ca-app-pub-5027135397412848/6558907522',
  ADMOB_INTERSTITIAL_AD_UNIT_ID: (Platform.OS === 'ios') ? 'ca-app-pub-5027135397412848/8632512885' : 'ca-app-pub-5027135397412848/5120288068',
};
