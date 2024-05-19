const { Schema, model } = require('mongoose');

const candidatSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id_candidat: {
    type: Number,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  resultat: {
    type: Number,
    required: true
  }
});

const Candidat = model('candidat', candidatSchema);

module.exports = Candidat;