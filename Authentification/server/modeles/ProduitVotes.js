const { Schema, model } = require('mongoose');

const produitvotesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  produit_vote: {
    type: String,
    required: true
  },
  candidat: {
    type: Number,
    required: true
  }
});

const ProduitVotes = model('produitvotes', produitvotesSchema);

module.exports = ProduitVotes;