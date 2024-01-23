const mongoose = require('mongoose');
const Task = require('../models/Task.js');
const { log } = require('console');
async function updateTask(task) {
    await Task.findOneAndReplace({ id: task.id }, task);
};

module.exports = { updateTask };
