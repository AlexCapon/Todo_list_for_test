const Task = require('../models/Task');
const { showErrorMessage } = require('../util/showErrorMessage');
const { Model } = require('mongoose');

async function findTasks() {
  const tasks = await Task.find();
  return tasks;
};

module.exports = { findTasks }