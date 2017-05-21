const initialState = {
  clients: [],

}


const actionsMap = {
  addClient(state, action) {
    let newId = state.clients.length + 1;
    while((state.clients.filter((el) => {return el.id == newId}).length > 0)) {
      newId++;
    }
    const newClient = Object.assign(action.payload, {id: newId});
    return { ...state, clients: state.clients.concat([newClient])};
  },



  finnishClientItem(state, action) {
    const {client, item, row, source} = action.payload;
    let clients = [].concat(state.clients);


    client.items.map((element) => {
      if(element.id == item.id) {
        if(row == 'backstage') {
          element.f_backstage = true;
        }

        if(row == 'stage') {
          element.f_stage = true;
        }
      }
    });

    clients.map((element) => {
      if(element.id == client.id) {
        element = client;
      }
    });

    return { ...state, clients: clients};
  },

  unFinnishClientItem(state, action) {
    const {client, item, row, source} = action.payload;
    let clients = [].concat(state.clients);


    client.items.map((element) => {
      if(element.id == item.id) {
        if(row == 'backstage') {
          element.f_backstage = false;
        }

        if(row == 'stage') {
          element.f_stage = false;
        }
      }
    });

    clients.map((element) => {
      if(element.id == client.id) {
        element = client;
      }
    });

    return { ...state, clients: clients};
  },




  removeClient(state, action) {
    return { ...state, clients: state.clients.filter(
      (ele) => {return ele.id != action.payload.id})
    };
  },

  addItem(state, action) {
    const { item, client } = action.payload;
    let clients = [].concat(state.clients);

    clients.map((el) => {
      if(el.id == client.id) {
        el.items.push(item);
        return el;
      }
      return el;
    });

    return { ...state, clients: clients};
  },


  editClientItem(state, action) {
    const { client, item } = action.payload;
    let clients = [].concat(state.clients);

    clients.map((el) => {
      if(el.id == client.id) {
        el.items.map((elitem) => {
          if(elitem.id == item.id) {
            elitem = item;
          }
          return elitem;
        });
        return el;
      }
    });

    return { ...state, clients: clients};
  }

};



export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];

  if (!reduceFn) {
    return state;
  }
  return reduceFn(state, action);
};
