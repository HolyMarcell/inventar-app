import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Tasks from '../components/Tasks.js';

import * as TaskActions from '../actions/tasks.js';

import styles from '../styles/styles.js';

@connect(
  state => ({
    tasks: state.tasks,

  }),
  dispatch => bindActionCreators(TaskActions, dispatch)
)
export default class TasksContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      page: 'open', // 'done'
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
        <Tasks { ...this.props} showtabs={this.state.page}></Tasks>

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
            onPress={() => this.setState({page: 'open'})}>
            <Icon name="square-o"
              size={40}
              color={this.state.page == 'open' ? 'orange' : '#444'}></Icon>
          </Button>


          <Button
            containerStyle={styles.tabbartab}
            style={styles.tabbarbutton}
            onPress={() => this.setState({page: 'done'})}>
              <Icon name="check-square-o"
                size={40}
                color={this.state.page == 'done' ? 'orange' : '#444'}>
              </Icon>

          </Button>
        </View>
      </View>
    );
  }
}
