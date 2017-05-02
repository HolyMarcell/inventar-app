import React, { Component, PropTypes } from 'react';
import { TextInput, ScrollView, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';
import Swipeout from 'react-native-swipe-out';
import Modal from 'react-native-root-modal';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import styles from '../styles/styles.js';

export default class Tasks extends Component {
  static propTypes = {
    addTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      formTaskTitle: '',
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

  tasksDone() {
    return [].concat(this.props.tasks.tasks.filter((ele) => ele.status == 'done'));
  }

  tasksOpen() {
    return [].concat(this.props.tasks.tasks.filter((ele) => ele.status == 'open'));
  }


  listDoneTasks() {
    if(this.props.showtabs == 'open') {
      return;
    }

    const list = this.tasksDone();

    return list.map((task) => {
      const swipeButtons = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          color: 'white',
          onPress: () => this.deleteTask(task),
        },
        {
          text: 'Undone',
          type: 'primary',
          onPress: () => this.undoTask(task),
        }
      ];


      return (
        <View key={task.id} style={styles.taskrow}>
          <Swipeout
            left={swipeButtons}
            style={styles.taskswipe}>
            <View style={styles.taskdescription}>
              <Text>{task.title}</Text>
            </View>
          </Swipeout>
        </View>
      )
    });


  }

  listOpenTasks() {
    if(this.props.showtabs == 'done') {
      return;
    }

    const list = this.tasksOpen();
    return list.map((task) => {
      const swipeButtons = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          color: 'white',
          onPress: () => this.deleteTask(task),
        },
        {
          text: 'Done',
          type: 'primary',
          onPress: () => this.completeTask(task),
        }
      ];


      return (
        <View key={task.id} style={styles.taskrow}>
          <Swipeout
            left={swipeButtons}
            style={styles.taskswipe}>
            <View style={styles.taskdescription}>
              <Text>{task.title}</Text>
            </View>
          </Swipeout>
        </View>
      )
    });


  }

  deleteTask(task) {
    this.props.removeTask(task);
  }

  completeTask(task) {
    this.props.markTaskComplete(task);
  }

  undoTask(task) {
    this.props.markTaskIncomplete(task);
  }

  saveTask() {
    const taskTitle = this.state.formTaskTitle;
    this.setState({formTaskTitle: ''});
    this.props.addTask(taskTitle);
    this.closeForm();
  }

  _titleOnChange(text) {
    this.setState({formTaskTitle: text});
  }

  openForm() {
    this.setState({formOpen: true});
  }

  closeForm() {
    this.setState({formOpen: false});
  }

  formTask() {

    return (
      <Modal visible={this.state.formOpen}>
          <View style={styles.inputmodalroot} onPress={() => this.closeForm()}>

            <View style={styles.inputmodalrow}>
              <Text style={styles.inputmodalhead}>New Task</Text>
            </View>

            <View style={styles.inputmodalrow}>
              <TextInput
                style={styles.inputmodalinput}
                placeholder="Task Description"
                onChangeText={(text) => this._titleOnChange(text)}
                onSubmitEditing={() => {this.saveTask()}}
                autoCorrect={false}
                value={this.state.formName} />
            </View>

            <View style={styles.inputmodalrow}>
              <TouchableHighlight style={styles.inputmodalcancel} onPress={() => this.closeForm()}>
                <View>
                  <Text>Cancel</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.inputmodalsave} onPress={() => this.saveTask()}>
                <View>
                  <Text>Save</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

      </Modal>
    );
  }

  titleStats() {
    const open = this.props.tasks.tasks.filter((el) => el.status == 'open').length;
    const done = this.props.tasks.tasks.length - open;
    return (
      <View style={styles.header}>
        <Text style={styles.headertext}>Open: {open}</Text>
        <Text style={styles.headertext}>Done: {done}</Text>
      </View>
    )
  }

  render() {

    return (
      <ScrollView style={styles.tasksscrollview}>
        {this.formTask()}
        {this.titleStats()}

        {this.listOpenTasks()}
        {this.listDoneTasks()}
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          />
      </ScrollView>
    );
  }
}



/*

*/
