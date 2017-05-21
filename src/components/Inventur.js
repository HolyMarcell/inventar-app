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
    setQuantity: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
        filter: -1,
        filterFormOpen: false,
        largeAddFormOpen: false,
        largeAddFormPosition: null,
        largeAddFormPositionLocation: null,
        largeAddFormAmount: 0,
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
      return a.name.localeCompare(b.name);
    });



    return positions.map((position) => {
      return(
        <View key={position.id}  style={styles.td6row}>
          <View style={[styles.th6, styles.td6rowBB]}>
            <Text style={[styles.th6text, styles.textleft]}>{position.name}</Text>
            <Text style={[styles.th6text, styles.textleft]}>{positionUnits[position.unit]}</Text>
          </View>
          <View style={styles.td6}>
            {this.decreaseQuantityForm(position, 1)}

            <TouchableOpacity style={styles.td6text} onLongPress={() =>this.openLargeAddForm(position, 1)}>
              <Text>{amount(position, 1)}</Text>
            </TouchableOpacity>

            {this.increaseQuantityForm(position, 1)}
          </View>
          <View style={styles.td6}>
            {this.decreaseQuantityForm(position, 2)}
            <TouchableOpacity style={styles.td6text} onLongPress={() =>this.openLargeAddForm(position, 2)}>
              <Text>{amount(position, 2)}</Text>
            </TouchableOpacity>
            {this.increaseQuantityForm(position, 2)}
          </View>
          <View style={styles.td6}>
            {this.decreaseQuantityForm(position, 3)}
            <TouchableOpacity style={styles.td6text} onLongPress={() =>this.openLargeAddForm(position, 3)}>
              <Text>{amount(position, 3)}</Text>
            </TouchableOpacity>
            {this.increaseQuantityForm(position, 3)}
          </View>
        </View>
      );
    });

  }


  largeAddForm() {

    const setItems = () => {

      const set = [10,20,50,100,150,200,300,400,500,600];

      let rows = [];
      for(var key of set) {
        rows.push(
          <Picker.Item
            key={key}
            label={'' + key}
            value={key}
            style={styles.inputmodalpickeritem}
            />
        );
      }
      return rows;
    }

    return (
      <Modal visible={this.state.largeAddFormOpen}>
          <View style={styles.inputmodalroot} onPress={() => this.closeLargeAddForm()}>
            <View style={styles.inputmodalrow}>
              <Text style={styles.inputmodalhead}>Set To Amount</Text>
            </View>

            <View style={styles.inputmodalrow}>
              <Picker
                style={styles.inputmodalpicker}
                selectedValue={this.state.largeAddFormAmount}
                onValueChange={(key) => this._onChangeLargeAdd(key)}
                >
                {setItems()}
              </Picker>
            </View>

            <View style={styles.inputmodalrow}>
              <TouchableHighlight style={styles.inputmodalcancel} onPress={() => this.closeLargeAddForm()}>
                <View>
                  <Text>Cancel</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.inputmodalsave} onPress={() => this.saveFixedAmount()}>
                <View>
                  <Text>Save</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
      </Modal>
    )
  }

  saveFixedAmount() {

    this.props.setQuantity(
      this.state.largeAddFormPosition,
      this.state.largeAddFormPositionLocation,
      this.state.largeAddFormAmount
    );

    this.closeLargeAddForm();
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

  openLargeAddForm(position, location) {
    this.setState({largeAddFormPosition: position});
    this.setState({largeAddFormPositionLocation: location});
    this.setState({largeAddFormOpen: true});
  }

  _onChangeFilter(key) {
    this.setState({filter: key});
  }

  _onChangeLargeAdd(key) {
    this.setState({largeAddFormAmount: key});
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

  closeForm() {
    this.setState({filterFormOpen: false});
  }

  closeLargeAddForm() {
    this.setState({largeAddFormOpen: false});
  }


  render() {
    //const { addTask, removeTaks, tasks } = this.props;

    return (
      <ScrollView style={styles.tasksscrollview}>
        {this.titleStats()}
        {this.filterForm()}
        {this.largeAddForm()}

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
