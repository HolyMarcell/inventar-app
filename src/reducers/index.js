import { combineReducers } from 'redux';
import tasks from './tasks';
import inventar from './inventar';
import catering from './catering';

export default combineReducers({
  tasks,
  inventar,
  catering

});
