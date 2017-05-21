import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Actions, Scene, Router} from 'react-native-router-flux';

import styles from '../styles/styles.js';

import Home from './Home';
import Counter from './Counter';
import Tasks from './Tasks';
import Inventar from './Inventar';
import Inventur from './Inventur';
import Catering from './Catering';

// -- MS Code push
import codePush from 'react-native-code-push';

const SCENES = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} title="Home"></Scene>
    <Scene key="inventar" component={Inventar} title="Inventar"></Scene>
    <Scene key="catering" component={Catering} title="Catering"></Scene>
    <Scene key="tasks" component={Tasks} title="Tasks"></Scene>
    <Scene key="inventur" component={Inventur} title="Inventur"></Scene>
  </Scene>
);

@connect(
  state => state,
  dispatch => ({ dispatch })
)
class App extends Component {

  render() {
    return (
      <Router scenes={SCENES}></Router>
    );
  }
}

//App = codePush(App);

export default App;
