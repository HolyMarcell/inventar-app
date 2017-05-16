import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView
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
        <ScrollView style={styles.tasksscrollview}>

          <View style={styles.header}>
            <Text style={styles.headertext}>Invent0r</Text>
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



          <View style={styles.td6row}>
            <View style={[styles.th6, styles.td6rowBB]}>
              <Text style={[styles.td6text, styles.textleft]}>Sarah Connor</Text>
              <Text style={[styles.td6text, styles.textleft]}>Do 19:30</Text>
              <Text style={[styles.td6text, styles.textleft]}></Text>
              <Text style={[styles.td6text, styles.textleft]}></Text>
            </View>
          </View>
          <View style={styles.td6row}>
            <View style={[styles.th6, styles.td6rowBB]}>
              <Text style={[styles.td6text, styles.textleft]}>Sarah Connor</Text>
              <Text style={[styles.td6text, styles.textleft]}>Fr 19:30</Text>
              <Text style={[styles.td6text, styles.textleft]}>Matt Simmons</Text>
              <Text style={[styles.td6text, styles.textleft]}>Fr 22:00</Text>
            </View>
          </View>

          <View style={styles.td6row}>
            <View style={[styles.th6, styles.td6rowBB]}>
              <Text style={[styles.td6text, styles.textleft]}>Clueso</Text>
              <Text style={[styles.td6text, styles.textleft]}>Sa 19:30</Text>
                <Text style={[styles.td6text, styles.textleft]}>Blue Pills</Text>
                <Text style={[styles.td6text, styles.textleft]}>Sa 22:00</Text>
            </View>
          </View>

          <View style={styles.td6row}>
            <View style={[styles.th6, styles.td6rowBB]}>
              <Text style={[styles.td6text, styles.textleft]}>Dieter Falk</Text>
              <Text style={[styles.td6text, styles.textleft]}>So 17:30</Text>
                <Text style={[styles.td6text, styles.textleft]}>Philly</Text>
                <Text style={[styles.td6text, styles.textleft]}>So 19:30</Text>
            </View>
          </View>
          <View style={styles.td6row}>
            <View style={[styles.th6, styles.td6rowBB]}>
              <Text style={[styles.td6text, styles.textleft]}>Nina Attal</Text>
              <Text style={[styles.td6text, styles.textleft]}>So 22:00</Text>
                <Text style={[styles.td6text, styles.textleft]}></Text>
                <Text style={[styles.td6text, styles.textleft]}></Text>
            </View>
          </View>
          <View style={styles.td6row}>
            <View style={[styles.th6, styles.td6rowBB]}>
              <Text style={[styles.td6text, styles.textleft]}>Rody Reyes</Text>
              <Text style={[styles.td6text, styles.textleft]}>Mo 17:30</Text>
              <Text style={[styles.td6text, styles.textleft]}>Rodger</Text>
              <Text style={[styles.td6text, styles.textleft]}>Mo 19:30</Text>
            </View>
          </View>





        </ScrollView>
      </View>
    );
  }
}




/*

<TouchableOpacity onPress={this.toCounter}>
  <Text style={styles.instructions}>Navigate to Counter</Text>
</TouchableOpacity>

*/
