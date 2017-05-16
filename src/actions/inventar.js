const INVENTAR_POSITION_ADD = 'addInventarPosition';
const INVENTAR_POSITION_REMOVE = 'removeInventarPosition'; // type maps to reducerfunction name
const INCREASE_QUANTITY = 'increaseQuantity';
const DECREASE_QUANTITY = 'decreaseQuantity';
const SET_QUANTITY = 'setQuantity';

export function addInventarPosition(position) {
  return {
    type: INVENTAR_POSITION_ADD,
    payload: position,
  };
}

export function removeInventarPosition(position) {
  return {
    type: INVENTAR_POSITION_REMOVE,
    payload: position,
  };
}

export function increaseQuantity(position, location) {
  return {
    type: INCREASE_QUANTITY,
    payload: {position, location}
  };
}

export function decreaseQuantity(position, location) {
  return {
    type: DECREASE_QUANTITY,
    payload: {position, location}
  };
}

export function setQuantity(position, location, amount) {

  return {
    type: SET_QUANTITY,
    payload: {position, location, amount}
  };
}
