import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Inventar from '../components/Inventar.js';
import * as InventarActions from '../actions/inventar';

import styles from '../styles/styles.js';

@connect(
  state => ({
    inventar: state.inventar,
    catering: state.catering,
  }),
  dispatch => bindActionCreators(InventarActions, dispatch)
)
export default class InventarContainer extends Component {

  constructor(props){
    super(props);
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
        <Inventar { ...this.props}></Inventar>

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
              onPress={() => {}}>
              <Icon name="list"
                size={40}
                color={'orange'}></Icon>
            </Button>


          </View>
        </View>
    );
  }
}
