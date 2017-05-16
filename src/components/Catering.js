import React, { Component, PropTypes } from 'react';
import { Picker, TextInput, ScrollView, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
const Item = Picker.Item;
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';
import Swipeout from 'react-native-swipe-out';
import Button from 'react-native-button';
import Modal from 'react-native-root-modal';
import { Actions } from 'react-native-router-flux';

import { positionLocations, positionUnits } from '../constants/inventar.js';
import styles from '../styles/styles.js';

export default class CateringComponent extends Component {
  static propTypes = {
    addClient: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    removeClient: PropTypes.func.isRequired,
    catering: PropTypes.object.isRequired,
    increaseClientItem: PropTypes.func.isRequired,
    decreaseClientItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
        clientFormOpen: false,
        itemFormOpen: false,
        itemFormSelection: -1,
        formName: '',
        client: props.showClient,
        showClient: 1 && props.showClient,
    }
  }

  componentDidMount() {
    Actions.refresh({
      renderRightButton: this.renderRightButton,
      title: this.componentTitle
    });
  }

  componentTitle = () => {
    if(this.state.showClient) {
      return "Catering List";
    }
    return "Catering";
  }

  renderRightButton = () => {
    if(this.state.showClient) {
      const { positions } = this.props.inventar;
      const selectedItems = [].concat(this.state.client.items);
      if(positions.length == selectedItems.length) {
        return; // No new form. All Items are assigned to the client
      }
      return (
        <TouchableHighlight onPress={() => this.openItemForm()}>
          <Text style={styles.navbarRightButton}>+</Text>
        </TouchableHighlight>
      );
    }
    return (
      <TouchableHighlight onPress={() => this.openForm()}>
        <Text style={styles.navbarRightButton}>+</Text>
      </TouchableHighlight>
    );

  }

  openClientForm() {
    this.setState({clientFormOpen: true});
  }

  _onChangeName(text) {
    this.setState({formName: text});
  }

  _onChangeItem(key) {
    this.setState({itemFormSelection: key});
  }

  saveClient() {
    const client = {
      name: this.state.formName,
      items: [],
    }
    this.props.addClient(client);
    this.closeForm();
  }

  saveItem() {
    const client = this.state.client;
    const position = [].concat(
      this.props.inventar.positions.filter((el) => {
        return el.id == this.state.itemFormSelection
      })
    ).pop();
    this.props.addItem(client, position);
    this.closeItemForm();
  }

  deleteClient(client) {
    this.props.removeClient(client);
  }

  closeForm() {
    this.setState({clientFormOpen: false});
  }

  openForm() {
    this.setState({clientFormOpen: true});
  }

  closeItemForm() {
    this.setState({itemFormOpen: false});
  }

  openItemForm() {
    this.setState({itemFormOpen: true});
  }

  toDetails(client) {
    Actions.catering({showClient: client});
  }

  increaseItemForm(item, column) {
    return (
      <TouchableOpacity
        style={[styles.inventurButton]}
        onPress={() => this.props.increaseClientItem(this.state.client, item, column)}>
        <Text>+</Text>
      </TouchableOpacity>
    );
  }

  decreaseItemForm(item, column) {
    return (
      <TouchableOpacity
        style={[styles.inventurButton]}
        onPress={() => this.props.decreaseClientItem(this.state.client, item, column)}>
        <Text>-</Text>
      </TouchableOpacity>
    );
  }


  listClients(){

    let clients = [].concat(this.props.catering.clients);

    clients.sort();


    return clients.map((client) => {
      const swipeButtons = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          color: 'white',
          onPress: () => this.deleteClient(client),
        }
      ];
      return(
        <Swipeout
           key={client.id}
          left={swipeButtons}
          style={styles.taskswipe}>
          <View  style={[styles.lirow, styles.lirowBB, styles.lirowCenter]}>
            <TouchableOpacity style={styles.lirowitem} onPress={() => this.toDetails(client)}>
              <Text style={[styles.lirowtext]}>{client.name}</Text>
            </TouchableOpacity>
          </View>
        </Swipeout>
      );
    });



  }

  clientForm() {
    return (
      <Modal visible={this.state.clientFormOpen}>
          <View style={styles.inputmodalroot} onPress={() => this.closeForm()}>
            <View style={styles.inputmodalrow}>
              <Text style={styles.inputmodalhead}>Add new Client</Text>
            </View>

            <View style={styles.inputmodalrow}>
            <TextInput
              style={styles.inputmodalinput}
              placeholder="Client Name"
              onChangeText={(text) => this._onChangeName(text)}
              onSubmitEditing={() => {this.saveClient()}}
              autoCorrect={false}
              value={this.state.formName} />
            </View>

            <View style={styles.inputmodalrow}>
              <TouchableHighlight style={styles.inputmodalcancel} onPress={() => this.closeForm()}>
                <View>
                  <Text>Cancel</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.inputmodalsave} onPress={() => this.saveClient()}>
                <View>
                  <Text>Save</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
      </Modal>
    )
  }

  itemForm() {

    positionSelect = () => {
      let rows = [];
      const { positions } = this.props.inventar;
      const selectedItems = [].concat(this.state.client.items);

      if(positions.length == selectedItems.length) {
        return; // No new form. All Items are assigned to the client
      }

      rows.push(
        <Picker.Item
          key='-1'
          label=''
          value='-1'
          style={styles.inputmodalpickeritem}
          />
      )
      for(var key in positions) {
        const pid = positions[key].id;
        const item = positionUnits[positions[key].unit];

        if(selectedItems.filter((el) => { return el.id == pid }).length == 0) {
          rows.push(
            <Picker.Item
              key={pid}
              label={positions[key].name + ' | ' + item}
              value={pid}
              style={styles.inputmodalpickeritem}
              />
          );
        }
      }

      return rows;
    }

    return (
      <Modal visible={this.state.itemFormOpen}>
          <View style={styles.inputmodalroot} onPress={() => this.closeItemForm()}>
            <View style={styles.inputmodalrow}>
              <Text style={styles.inputmodalhead}>Add new Item</Text>
            </View>

            <View style={styles.inputmodalrow}>
              <Picker
                style={styles.inputmodalpicker}
                selectedValue={this.state.itemFormSelection}
                onValueChange={(key) => this._onChangeItem(key)}
                >
                {positionSelect()}
              </Picker>
            </View>

            <View style={styles.inputmodalrow}>
              <TouchableHighlight style={styles.inputmodalcancel} onPress={() => this.closeItemForm()}>
                <View>
                  <Text>Cancel</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.inputmodalsave} onPress={() => this.saveItem()}>
                <View>
                  <Text>Save</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
      </Modal>
    )
  }

  clientDetails() {
    const items = [].concat(this.state.client.items);

    amount = (item, column) => {
      return item.amount[column];
    };

    return (
      <View>
        <View  style={[styles.td6row, styles.lirowBB]}>
          <View style={styles.td6}>
            <Text style={[styles.td6text]}></Text>
          </View>
          <View style={styles.td6}>
            <Text style={[styles.td6text]}>Braucht</Text>
          </View>
          <View style={styles.td6}>
            <Text style={[styles.td6text]}>Hat</Text>
          </View>
        </View>
      {items.map((item) => {
          return (
            <View
              key={item.id}
              style={styles.taskswipe}>
              <View  style={[styles.td6row]}>
                <View style={styles.td6}>
                  <Text style={[styles.td6text]}>{item.name} | {positionUnits[item.unit]} </Text>
                </View>
                <View style={styles.td6}>

                  {this.decreaseItemForm(item, 'needs')}
                  <Text style={styles.td6text}>{amount(item, 'needs')}</Text>
                  {this.increaseItemForm(item, 'needs')}

                </View>
                <View style={styles.td6}>
                  {this.decreaseItemForm(item, 'has')}
                  <Text style={styles.td6text}>{amount(item, 'has')}</Text>
                  {this.increaseItemForm(item, 'has')}
                </View>
              </View>
            </View>
          )
        })}
        </View>
      );
  }

  clientDetailsTitle() {
    return(
      <View style={styles.header}>
        <Text style={styles.headertext}>{this.state.client.name}</Text>
      </View>
    );
  }




  render() {
    return (
      <ScrollView style={styles.tasksscrollview}>

        {this.state.showClient && this.itemForm()}
        {this.state.showClient && this.clientDetailsTitle()}
        {this.state.showClient && this.clientDetails()}

        {!this.state.showClient && this.clientForm()}
        {!this.state.showClient && this.listClients()}

          <DropdownAlert
            ref={(ref) => this.dropdown = ref}
            />
      </ScrollView>
    );
  }
}



/*

*/
