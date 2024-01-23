const Task = require('../models/Task');
const { Model } = require('mongoose');
const { log, error } = require('console');

async function saveTask(task) {
  // const taskIsValid = await validateTask(task);
  const taskIsValid = true;
  if (taskIsValid) {
    const newTask = new Task(task);
    log('Savin task...');
    // log(newTask);
    await newTask.save();
    return newTask;
  };
  error('Task with this id is already exist');
};

module.exports = { saveTask };
