const { findTasks } = require("../db/findTasks");

async function validateTask(task) {
  const requires = [
    typeof(task.id) === 'number',
    typeof(task.title) === 'string',
    typeof(task.description) === 'string',
    typeof(task.status) === 'string',
  ];
  const isTypesIncorrect = requires.some((element) => element === false);

  const tasks = await findTasks();
  const isTaskExist = tasks.includes((t) => task.id === t.id);

  if (isTypesIncorrect || isTaskExist) return false;
  
  return true;
}

module.exports = { validateTask };