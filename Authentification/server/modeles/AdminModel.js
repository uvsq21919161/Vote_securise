const { Schema, model } = require('mongoose');

const adminMailSchema = new Schema({
  _id: Schema.Types.ObjectId,
  mail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  }
});

const AdminMail = model('adminmail', adminMailSchema);

module.exports = AdminMail;