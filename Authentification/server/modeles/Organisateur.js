const { Schema, model } = require('mongoose');

const orgaSchema = new Schema({
  _id: Schema.Types.ObjectId,
  password: {
    type: String,
    required: true
  }
});

const Organisateur = model('organisateur', orgaSchema);

module.exports = Organisateur;