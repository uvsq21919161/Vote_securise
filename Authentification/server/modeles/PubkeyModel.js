const { Schema, model } = require('mongoose');

const pubkeySchema = new Schema({
  _id: Schema.Types.ObjectId,
  nb_serv: {
    type: Number,
    required: true
  },
  candidats: {
    type: Number,
    required: true
  },
  n: {
    type: String,
    required: true
  },
  n2: {
    type: String,
    required: true
  },
  g: {
    type: String,
    required: true
  },
  delta: {
    type: Number,
    required: true
  },
  teta: {
    type: String,
    required: true
  },
  date_fin: {
    type: Date,
    required: true
  }
});

const PublicKey = model('publickey', pubkeySchema);

module.exports = PublicKey;