const CLIENT_ADD = 'addClient';
const ITEM_ADD = 'addItem';
const CLIENT_REMOVE = 'removeClient'; // type maps to reducerfunction name
const EDIT_CLIENT_ITEM = 'editClientItem';
const FINNISH_CLIENT_ITEM = 'finnishClientItem';
const UNFINNISH_CLIENT_ITEM = 'unFinnishClientItem';


export function addClient(client) {

  return {
    type: CLIENT_ADD,
    payload: client,
  };
}

export function removeClient(client) {
  return {
    type: CLIENT_REMOVE,
    payload: client,
  };
}


export function addItem(client, position) {
  const item = {
    id: position.id,
    name: position.name,
    unit: position.unit,
    f_backstage: false,
    f_stage: false,
    amount: {
      backstage: 0,
      stage: 0,
    }
  }
  return {
    type: ITEM_ADD,
    payload: {client: client, item: item},
  };
}

export function increaseClientItem(client, item, column) {
  const newItem = {... item};
  if(column == 'backstage') {
    newItem.amount.backstage += 1;
  }
  if(column == 'stage') {
    newItem.amount.stage += 1;
  }

  return {
    type: EDIT_CLIENT_ITEM,
    payload: {client: client, item: newItem},
  };
}


export function finnishClientItem(client, item, row, source) {
  return {
    type: FINNISH_CLIENT_ITEM,
    payload: {client, item, row, source}
  };
}

export function unFinnishClientItem(client, item, row, source) {
  return {
    type: UNFINNISH_CLIENT_ITEM,
    payload: {client, item, row, source}
  };
}


export function decreaseClientItem(client, item, column) {
  const newItem = {... item};
  if(column == 'backstage' && item.amount.backstage > 0) {
    newItem.amount.backstage -= 1;
  }
  if(column == 'stage' && item.amount.stage > 0) {
    newItem.amount.stage -= 1;
  }

  return {
    type: EDIT_CLIENT_ITEM,
    payload: {client: client, item: newItem},
  };
}
