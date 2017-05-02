import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Inventur from '../components/Inventur.js';

import * as InventarActions from '../actions/inventar.js';

import styles from '../styles/styles.js';

@connect(
  state => ({
    inventar: state.inventar,

  }),
  dispatch => bindActionCreators(InventarActions, dispatch)
)
export default class InventurContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      page: 'index',

    }
  }

  static propTypes = {
    //navigate: PropTypes.func.isRequired
  };

  goHome = () => {
    Actions.home({type: 'reset'});
  }


  render() {
    return (
      <View style={styles.root}>
        <Inventur { ...this.props} showtabs={this.state.page}></Inventur>

        <View style={styles.tabbar}>
          <Button
            containerStyle={styles.tabbartab}
            style={styles.tabbarbutton}
            onPress={() => this.goHome()}>
            <Icon name="home"
              size={40}
              color={'skyblue'}></Icon>
          </Button>


          <Button
            containerStyle={styles.tabbartab}
            style={styles.tabbarbutton}
            onPress={() => this.setState({page: 'index'})}>
            <Icon name="square-o"
              size={40}
              color={this.state.page == 'index' ? 'orange' : '#444'}></Icon>
          </Button>


        </View>
      </View>
    );
  }
}
