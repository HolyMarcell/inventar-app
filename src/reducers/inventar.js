const initialState = {
  positions: [],
  items: [],
}


const actionsMap = {
  addInventarPosition(state, action) {
    let newId = state.positions.length + 1;
    while((state.positions.filter((el) => {return el.id == newId}).length > 0)) {
      newId++;
    }
    const newPos = Object.assign(action.payload, {id: newId});
    return {...state, positions: state.positions.concat(newPos) };
  },

  removeInventarPosition(state, action) {
    const newPos = [].concat(
      state.positions.filter((el) => {return el.id != action.payload.id})
    );
    return {...state, positions: newPos };
  },


  finnishClientItem(state, action) {
    const {client, item, row, source} = action.payload;

    let positions = [].concat(state.positions);

    let removeAmount = 0;

    client.items.map((element) => {
      if(element.id == item.id) {
        if(row == 'backstage') {
          removeAmount = element.amount.backstage;
        }

        if(row == 'stage') {
          removeAmount = element.amount.stage;
        }
      }
    });

    positions.map((element) => {
      if(element.id == item.id) {
          element.amount.map((ammo) => {
            if(ammo.location == source) {
              ammo.amount -= removeAmount;
            }
          });
      }
    })
    return { ...state, positions: positions};
  },


  unFinnishClientItem(state, action) {
    const {client, item, row, source} = action.payload;

    let positions = [].concat(state.positions);

    let removeAmount = 0;

    client.items.map((element) => {
      if(element.id == item.id) {
        if(row == 'backstage') {
          removeAmount = element.amount.backstage;
        }

        if(row == 'stage') {
          removeAmount = element.amount.stage;
        }
      }
    });

    positions.map((element) => {
      if(element.id == item.id) {
          element.amount.map((ammo) => {
            if(ammo.location == source) {
              ammo.amount += removeAmount;
            }
          });
      }
    })
    return { ...state, positions: positions};
  },


  increaseQuantity(state, action) {
    const poss = [].concat(state.positions);
    for(var position of poss) {
      if(position.id == action.payload.position.id) {
        for(var amount of position.amount) {
          if(amount.location == action.payload.location) {
            amount.amount += 1;
          }
        }
      }

    }

    return { ...state, positions: poss};
  },

  decreaseQuantity(state, action) {
    const poss = [].concat(state.positions);
    for(var position of poss) {
      if(position.id == action.payload.position.id) {
        for(var amount of position.amount) {
          if(amount.location == action.payload.location && amount.amount > 0) {
            amount.amount -= 1;
          }
        }
      }

    }

    return { ...state, positions: poss};
  },

  setQuantity(state, action) {
    console.log(action);
    const poss = [].concat(state.positions);
    for(var position of poss) {
      if(position.id == action.payload.position.id) {
        for(var amount of position.amount) {
          if(amount.location == action.payload.location) {
            amount.amount = action.payload.amount;
          }
        }
      }

    }

    return { ...state, positions: poss};
  }



};



export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];

  if (!reduceFn) {
    return state;
  }
  return reduceFn(state, action);
};
