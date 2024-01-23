const Task = require('../models/Task');

async function findTasks() {
  const tasks = await Task.find();
  return tasks;
}

module.exports = { findTasks }