const { Schema, model } = require('mongoose');

const votesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  uid: {
    type: Number,
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