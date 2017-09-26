import { Platform } from 'react-native';


// PTT+ theme
// const major_color = '#3c4b63';
// const enable_color = '#5bba9a';
// const disable_color = '#a1fbe2';
// 
const major_color = '#1D1F21';


module.exports = {
  backgroundColor: major_color,
  navigation_header_style: {
    headerStyle: {
      backgroundColor: 'white',
      height: 60,
      ...Platform.select({
        ios: {
        },
        android: {
          // elevation: 0,
        },
      }),
    },
    headerTitleStyles: {
      fontSize: 16,
    },
    headerTintColor: 'black',
  },
};

