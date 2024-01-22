const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const chalk = require('chalk');
const initDataBase = require('./startUp/initDataBase');
const cors = require('cors');
const { log } = require('console');
const { showErrorMessage } = require('./util/showErrorMessage');
const path = require('path');

const PORT = config.get('port') ?? 8080;
const app = express();

// app.set('view engine', 'html');
// app.set('views', 'page');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', async (req, res) => {
//   res.render('index', {
//     title: 'Expess App',
//     notes: await getNotes(),
//     created: false,
//   });
// })
app.post('/', async (req, res) => {
  await log('await', req.body);
  log('no await', req.body);
})
app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id);
  res.render('index', { 
    title: 'Expess App',
    notes: await getNotes(),
    created: false,
  });
}) 

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