const { Schema, model } = require('mongoose');

const produitVotesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  produit: {
    type: String,
    required: true
  },
  candidat: {
    type: Number,
    required: true
  }
});

const ProduitVotes = model('produitvote', produitVotesSchema);

module.exports = ProduitVotes;