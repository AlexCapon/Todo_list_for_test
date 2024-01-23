const Task = require('../models/Task.js');

async function deleteTaskFromDB(id) {
  await Task.findOneAndDelete({ id: id })
}

module.exports = { deleteTaskFromDB };
