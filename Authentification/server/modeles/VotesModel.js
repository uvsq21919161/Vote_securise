const { Schema, model } = require('mongoose');

const votesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  empreinte: {
    type: String,
    required: true
  },
  vote: {
    type: String,
    required: true
  },
  candidat: {
    type: Number,
    required: true
  }
});

const Vote = model('vote', votesSchema);

module.exports = Vote;