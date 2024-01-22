const { Schema, model} = require('mongoose');

const schema = new Schema({
  status: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = model('Status', schema);