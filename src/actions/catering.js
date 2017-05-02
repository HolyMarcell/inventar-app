const CLIENT_ADD = 'addClient';
const ITEM_ADD = 'addItem';
const CLIENT_REMOVE = 'removeClient'; // type maps to reducerfunction name
const EDIT_CLIENT_ITEM = 'editClientItem';


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
    amount: {
      has: 0,
      needs: 0,
    }
  }
  return {
    type: ITEM_ADD,
    payload: {client: client, item: item},
  };
}

export function increaseClientItem(client, item, column) {
  const newItem = {... item};
  if(column == 'has') {
    newItem.amount.has += 1;
  }
  if(column == 'needs') {
    newItem.amount.needs += 1;
  }

  return {
    type: EDIT_CLIENT_ITEM,
    payload: {client: client, item: newItem},
  };
}


export function decreaseClientItem(client, item, column) {
  const newItem = {... item};
  if(column == 'has' && item.amount.has > 0) {
    newItem.amount.has -= 1;
  }
  if(column == 'needs' && item.amount.needs > 0) {
    newItem.amount.needs -= 1;
  }

  return {
    type: EDIT_CLIENT_ITEM,
    payload: {client: client, item: newItem},
  };
}
