import React, { Component, PropTypes } from 'react';
import { TextInput,
  ScrollView,
  Text,
  View,
  Picker,
  TouchableHighlight,
  TouchableWithoutFeedback} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipe-out';
import Modal from 'react-native-root-modal';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';


import { positionLocations, positionUnits } from '../constants/inventar.js';
import styles from '../styles/styles.js';

export default class InventarComponent extends Component {
  static propTypes = {
    addInventarPosition: PropTypes.func.isRequired,
    removeInventarPosition: PropTypes.func.isRequired,
    inventar: PropTypes.object.isRequired,
    catering: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
        formName: '',
        formUnit: 0,
        formOpen: false,
        page: 'index',
    }
  }

  componentDidMount() {
    Actions.refresh({
      renderRightButton: this.renderRightButton
    });
  }

  renderRightButton = () => {
    return (
      <TouchableHighlight onPress={() => this.openForm()}>
        <Text style={styles.navbarRightButton}>+</Text>
      </TouchableHighlight>
    );
  }


  deletePosition(position) {
    this.props.removeInventarPosition(position);
  }

  listInventarItems(){
    let positions = this.props.inventar.positions;

    positions.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    return positions.map((position) => {
      const swipeButtons = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          color: 'white',
          onPress: () => this.deletePosition(position),
        }
      ];


      const sumtotal = position.amount.reduce((val, element) => {
        return element.amount + val;
      }, 0);

      const reserved = this.props.catering.clients.reduce((val, client) => {
          const unit = [].concat(client.items.filter((ele) => {
            return ele.id == position.id;
          }));

          if(unit.length > 0) {
            return val + unit[0].amount.stage + unit[0].amount.backstage;
          }
          return val;
      }, 0);


      return(
        <Swipeout
           key={position.id}
          left={swipeButtons}
          style={styles.taskswipe}>
          <View style={[styles.td6row, styles.lirowBB]}>
            <View style={styles.td6}>
              <Text style={[styles.td6text]}>{position.name} | {positionUnits[position.unit]}</Text>
            </View>
            <View style={styles.td6}>
              <Text style={[styles.th6text, styles.textleft]}> Total: {sumtotal}</Text>
              <Text style={[styles.td6text, styles.textleft]}>Reserved: {reserved} </Text>
            </View>
          </View>
        </Swipeout>
      );
    });

  }

  _onChangeName(text) {
    this.setState({formName: text});
  }

  _onChangeUnit(text) {
    this.setState({formUnit: text});
  }


  savePosition() {
    const position = {
      name: this.state.formName,
      unit: this.state.formUnit,
      amount: [
        {
          amount: 0,
          location: 0,
        },
        {
          amount: 0,
          location: 1,
        },
        {
          amount: 0,
          location: 2,
        },
        {
          amount: 0,
          location: 3,
        },
      ]
    };

    this.props.addInventarPosition(position);
    this.setState({formName: ''});
    this.closeForm();

  }


  positionForm() {

    positionUnitSelect = () => {
      let rows = [];
      for(var key in positionUnits) {
        rows.push(
          <Picker.Item
            key={key}
            label={positionUnits[key]}
            value={key}
            style={styles.inputmodalpickeritem}
            />
        );
      }
      return rows;
    }


    return (
        <Modal visible={this.state.formOpen}>
            <View style={styles.inputmodalroot} onPress={() => this.closeForm()}>
              <View style={styles.inputmodalrow}>
                <Text style={styles.inputmodalhead}>New Position</Text>
              </View>

              <View style={styles.inputmodalrow}>
                <TextInput
                  style={styles.inputmodalinput}
                  placeholder="Position Name"
                  onChangeText={(text) => this._onChangeName(text)}
                  autoCorrect={false}
                  value={this.state.formName} />
              </View>
              <View style={styles.inputmodalrow}>
                <Picker
                  style={styles.inputmodalpicker}
                  selectedValue={this.state.formUnit}
                  onValueChange={(key) => this._onChangeUnit(key)}
                  >
                  {positionUnitSelect()}
                </Picker>
              </View>

              <View style={styles.inputmodalrow}>
                <TouchableHighlight style={styles.inputmodalcancel} onPress={() => this.closeForm()}>
                  <View>
                    <Text>Cancel</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.inputmodalsave} onPress={() => this.savePosition()}>
                  <View>
                    <Text>Save</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
        </Modal>
    )
  }

  openForm() {
    this.setState({formOpen: true});
  }

  closeForm() {
    this.setState({formOpen: false});
  }


  render() {
    //const { addTask, removeTaks, tasks } = this.props;

    return (

        <ScrollView style={styles.tasksscrollview}>
          {this.positionForm()}
          {this.listInventarItems()}
        </ScrollView>

    );
  }
}



/*

*/
