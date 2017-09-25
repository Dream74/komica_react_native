import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import { StackNavigator } from 'react-navigation'; 

import Board from './Board';
import { navigation_header_style } from '../styles/GlobalStyles';

export const StackAppNavigator = StackNavigator({
  Board: {
    screen: Board,
    navigationOptions: ({ navigation }) => {
      const { params = {} } = navigation.state;

      const headerRightView = (<TouchableOpacity
        style={{ marginLeft: 10, }}>
          <Icon name="menu" size={30} color="black" />
        </TouchableOpacity >);

      return {
        title: params.title || '綜合 看板',
        headerLeft: headerRightView,
      };
    },
  },
},
  {
    initialRouteName: 'Board',
    initialRouteParams: {
      // id: "a7572be0-4850-11e7-a231-6f2fd8863bbb",
      // name : "Dream - 興哥企業",
      // title : "編輯 Dream - 興哥企業 備註",
    },
    navigationOptions: ({ navigation }) => ({
      ...navigation_header_style,
    }),
  }
);

export default StackAppNavigator;