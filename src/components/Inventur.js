import React, { Component, PropTypes } from 'react';
import { Picker, TextInput, ScrollView, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
const Item = Picker.Item;
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';
import Swipeout from 'react-native-swipe-out';
import Button from 'react-native-button';
import Modal from 'react-native-root-modal';

import { positionLocations, positionUnits } from '../constants/inventar.js';
import styles from '../styles/styles.js';

export default class InventurComponent extends Component {
  static propTypes = {
    increaseQuantity: PropTypes.func.isRequired,
    decreaseQuantity: PropTypes.func.isRequired,
    inventar: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
        filter: -1,
        filterFormOpen: false,
    }
  }

  titleStats() {
    return (
      <View style={[styles.td6row, styles.td6rowBB]}>
        <View style={styles.th6}>
          <Button
            containerStyle={styles.tabbartab}
            style={styles.tabbarbutton}
            onPress={() => this.openFilterForm()}>
              <Icon name="filter"
                size={20}
                color={'blue'}>
              </Icon>

          </Button>
        </View>
        <View style={styles.td6}>
          <Text style={styles.th6text}>Keller</Text>
        </View>
        <View style={styles.td6}>
          <Text style={styles.th6text}>KW B1</Text>
        </View>
        <View style={styles.td6}>
          <Text style={styles.th6text}>KW Küche</Text>
        </View>
      </View>
    )
  }

  listInventarItems(){
    function amount(pos, loc) {
      return pos.amount.filter((el) => {return el.location == loc})[0].amount;
    }

    let positions = [].concat(this.props.inventar.positions);
    if(this.state.filter != -1) {
      positions = [].concat(this.props.inventar.positions.filter((el) => {
        return el.unit == this.state.filter;
      }));
    }

    positions.sort((a, b) => {
      if(a.unit < b.unit) {
        return -1;
      }
      else if (a.unit > b.unit) {
        return 1;
      }
      return 0;
    });



    return positions.map((position) => {
      return(
        <View key={position.id}  style={styles.td6row}>
          <View style={styles.th6}>
            <Text style={[styles.th6text, styles.textleft]}>{position.name}</Text>
            <Text style={[styles.th6text, styles.textleft]}>{positionUnits[position.unit]}</Text>
          </View>
          <View style={styles.td6}>
            {this.decreaseQuantityForm(position, 1)}
            <Text style={styles.td6text}>{amount(position, 1)}</Text>
            {this.increaseQuantityForm(position, 1)}
          </View>
          <View style={styles.td6}>
            {this.decreaseQuantityForm(position, 2)}
            <Text style={styles.td6text}>{amount(position, 2)}</Text>
            {this.increaseQuantityForm(position, 2)}
          </View>
          <View style={styles.td6}>
            {this.decreaseQuantityForm(position, 3)}
            <Text style={styles.td6text}>{amount(position, 3)}</Text>
            {this.increaseQuantityForm(position, 3)}
          </View>
        </View>
      );
    });

  }

  filterForm() {
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
      <Modal visible={this.state.filterFormOpen}>
          <View style={styles.inputmodalroot} onPress={() => this.closeForm()}>
            <View style={styles.inputmodalrow}>
              <Text style={styles.inputmodalhead}>Filter</Text>
            </View>

            <View style={styles.inputmodalrow}>
              <Picker
                style={styles.inputmodalpicker}
                selectedValue={this.state.filter}
                onValueChange={(key) => this._onChangeFilter(key)}
                >
                {positionUnitSelect()}
              </Picker>
            </View>

            <View style={styles.inputmodalrow}>
              <TouchableHighlight style={styles.inputmodalcancel} onPress={() => this.resetFilter()}>
                <View>
                  <Text>Reset</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.inputmodalsave} onPress={() => this.saveFilter()}>
                <View>
                  <Text>Filter</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
      </Modal>
    )
  }

  openFilterForm() {
    this.setState({filterFormOpen: true});
  }

  _onChangeFilter(key) {
    this.setState({filter: key});
  }

  saveFilter() {
    // not "saving" as such...
    this.setState({filterFormOpen: false});
  }

  resetFilter() {
    this.setState({filterFormOpen: false});
    this.setState({filter: -1});
  }

  increaseQuantityForm(position, location) {
    return (
      <TouchableOpacity
        style={[styles.inventurButton]}
        onPress={() => this.increaseQuantity(position, location)}>
        <Text>+</Text>
      </TouchableOpacity>
    )
  }

  increaseQuantity(position, location) {
    this.props.increaseQuantity(position, location);
  }

  decreaseQuantityForm(position, location) {
    return (
      <TouchableOpacity
        style={[styles.inventurButton]}
        onPress={() => this.decreaseQuantity(position, location)}>
        <Text>-</Text>
      </TouchableOpacity>
    )
  }

  decreaseQuantity(position, location) {
    this.props.decreaseQuantity(position, location);
  }

  _onChangeName(text) {
    this.setState({formName: text});
  }


  render() {
    //const { addTask, removeTaks, tasks } = this.props;

    return (
      <ScrollView style={styles.tasksscrollview}>
        {this.titleStats()}
        {this.filterForm()}

          {this.listInventarItems()}
          <DropdownAlert
            ref={(ref) => this.dropdown = ref}
            />
      </ScrollView>
    );
  }
}



/*

*/
