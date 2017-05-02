import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import styles from '../styles/styles.js';

export default class Home extends Component {


  static propTypes = {
    //navigate: PropTypes.func.isRequired
  };

  toTasks = () => {
    Actions.tasks();
  }

  toInventar = () => {
    Actions.inventar();
  }

  toInventur = () => {
    Actions.inventur();
  }

  toCatering = () => {
    Actions.catering();
  }

  render() {

    return (
      <View style={styles.root}>

        <View style={styles.header}>
          <Text style={styles.headertext}>Invent0r Home</Text>
        </View>

        <TouchableOpacity onPress={this.toCatering}>
          <View style={styles.info}>
            <Text>Catering</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.toTasks}>
          <View style={styles.info}>
            <Text>Tasks</Text>
          </View>
        </TouchableOpacity>


        <View style={styles.iconrow}>
          <TouchableOpacity onPress={this.toInventar} style={styles.icon}>
            <View>
                <Text>InventAr</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toInventur} style={styles.icon}>
            <View>
                <Text>InventUr</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.iconrow}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={this.toCounter}>
              <Text>Tasks</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity onPress={this.toCounter}>
              <Text>Stats</Text>
            </TouchableOpacity>
          </View>
        </View>


      </View>
    );
  }
}




/*

<TouchableOpacity onPress={this.toCounter}>
  <Text style={styles.instructions}>Navigate to Counter</Text>
</TouchableOpacity>

*/
