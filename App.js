import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import SideMenu from 'react-native-side-menu';

import Menu from './src/components/Menu';
import Board from './src/components/Board';
import { backgroundColor } from './src/styles/GlobalStyles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      title: item.title,
      url: item.url,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    const { title, url } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor }} >
        <View style={{ flex: 1, marginTop: 18 }} >
          <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            onChange={isOpen => this.updateMenuState(isOpen)}
            openMenuOffset={200}
          >
            <View style={styles.container}>
              <TouchableOpacity
                onPress={this.toggle}
              >
                <Icon name="menu" size={32} color="black" />
              </TouchableOpacity>
              <Board
                style={{
                  backgroundColor: 'blue',
                  flex: 1,
                }}
                title={title}
                url={url}
              />
            </View>
          </SideMenu>
        </View>
      </View>
    );
  }
}
