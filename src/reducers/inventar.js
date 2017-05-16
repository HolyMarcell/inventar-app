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
