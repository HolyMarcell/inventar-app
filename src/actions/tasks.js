const TASKS_ADD = 'addTask';
const TASKS_REMOVE = 'removeTask'; // type maps to reducerfunction name
const TASKS_MARK_COMPLETE = 'markTaskComplete';
const TASKS_MARK_INCOMPLETE = 'markTaskIncomplete';

export function addTask(taskTitle) {

  const task = {
    title: taskTitle,
    status: 'open', // 'done'
  }
  return {
    type: TASKS_ADD,
    payload: task,
  };
}

export function removeTask(task) {
  return {
    type: TASKS_REMOVE,
    payload: task,
  };
}

export function markTaskComplete(task) {
  return {
    type: TASKS_MARK_COMPLETE,
    payload: task
  }
}

export function markTaskIncomplete(task) {
  return {
    type: TASKS_MARK_INCOMPLETE,
    payload: task
  }
}
