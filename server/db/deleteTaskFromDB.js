const mongoose = require('mongoose');
const Task = require('../models/Task.js');
const { showErrorMessage } = require('../util/showErrorMessage.js');
const { findTasks } = require('./findTasks.js');

async function deleteTaskFromDB(id) {
  await Task.findOneAndDelete({ id: id })
};

module.exports = { deleteTaskFromDB }
