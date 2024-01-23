const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const chalk = require('chalk');
const path = require('path');
const initDataBase = require('./startUp/initDataBase');
const cors = require('cors');
const { log } = require('console');
const { showErrorMessage } = require('./util/showErrorMessage');
const { saveTask } = require('./db/saveTask');
const { giveTasks } = require('./api/giveTasks');
const { deleteTaskFromDB } = require('./db/deleteTaskFromDB');
const { updateTask } = require('./db/updateTask');
const Task = require('./models/Task');

const PORT = config.get('port') ?? 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/get-tasks', async (req, res) => {
  log('get tasks api triggered');
  const tasks = await giveTasks();
  res.json(tasks);
});
app.post('/api/add-tasks', async (req, res) => {
  log('add task api triggered');
  log('Recived task:');
  const task = req.body;
  log(task)
  saveTask(task);
});
app.put('/api/edit-task', async (req, res) => {
  log('put api triggered');
  const task = req.body;
  await Task.findOneAndReplace({ id: task.id }, task);
});
app.delete('/api/delete-task/:id', async (req, res) => {
  log('delete api triggered');
  deleteTaskFromDB(req.params.id.trim());
});

function startServerMessage() {
  let mode;
  if (process.env.NODE_ENV === 'production') {
    mode = 'production';
  } 
  if (process.env.NODE_ENV === 'development') {
    mode = 'development';
  }

  log(chalk.green(`Server has been started on port ${PORT} in a ${chalk.red(mode)} mode...`));
}
async function start() {
  try {
    mongoose.connection.once('open', () => { initDataBase() })
    log(chalk.yellow('Trying to connect MongoDB...'));
    await mongoose.connect(config.get('mongoUri'));
    log(chalk.green('MongoDB connected!'));
    app.listen(PORT, startServerMessage);
  } catch (error) {
    showErrorMessage(error);
    process.exit(1);
  }
}

start();