const { Schema, model } = require('mongoose');

const ciSchema = new Schema({
  _id: Schema.Types.ObjectId,
  ci: {
    type: String,
    required: true
  },
  indice: {
    type: Number,
    required: true
  },
  mailadmin: {
    type: String,
    required: true
  },
  candidat: {
    type: Number,
    required: true
  }
});

const Ci = model('Ci', ciSchema);

module.exports = Ci;