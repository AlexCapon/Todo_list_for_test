const chalk = require('chalk');

function showErrorMessage(error) {
  console.log(chalk.red(error.message));
};

module.exports = { showErrorMessage };
