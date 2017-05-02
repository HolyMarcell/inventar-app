const initialState = {
  tasks: []
}


const actionsMap = {
  addTask(state, action) {
    let newId = state.tasks.length + 1;
    while((state.tasks.filter((el) => {return el.id == newId}).length > 0)) {
      newId++;
    }
    const newtask = Object.assign(action.payload, {id: newId});
    return { ...state, tasks: state.tasks.concat([newtask])};
  },

  removeTask(state, action) {
    return { ...state, tasks: state.tasks.filter(
      (ele) => {return ele.id != action.payload.id})
    };
  },

  markTaskComplete(state, action) {
    const task = { ...action.payload, status: 'done'};
    const list = [task].concat(
      state.tasks.filter((ele) => {
        return ele.id != task.id
      })
    );
    return { ...state, tasks : list};

  },

  markTaskIncomplete(state, action) {
    const task = { ...action.payload, status: 'open'};
    const list = [task].concat(
      state.tasks.filter((ele) => {
        return ele.id != task.id
      })
    );
    return { ...state, tasks : list};

  },

};



export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];

  if (!reduceFn) {
    return state;
  }
  return reduceFn(state, action);
};
