const Task = require('../models/Task');
const { error } = require('console');
const { validateTask } = require('../util/validateTask');

async function saveTask(task) {
  const taskIsValid = await validateTask(task);
  // const taskIsValid = true;
  if (taskIsValid) {
    const newTask = new Task(task);
    await newTask.save();
    return newTask;
  }
  error('Task is not valid');
}

module.exports = { saveTask };
