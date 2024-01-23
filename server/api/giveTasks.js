const { findTasks } = require("../db/findTasks");

async function giveTasks() {
  const tasks = findTasks();
  return tasks;
};

module.exports = { giveTasks };
