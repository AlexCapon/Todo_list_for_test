const Task = require('../models/Task.js');

async function updateTask(task) {
    await Task.findOneAndReplace({ id: task.id }, task);
}

module.exports = { updateTask };
