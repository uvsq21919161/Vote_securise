const { Schema, model } = require('mongoose');

const adminMailSchema = new Schema({
  _id: Schema.Types.ObjectId,
  mail: {
    type: String,
    required: true
  }
});

const AdminMail = model('adminmail', adminMailSchema);

module.exports = AdminMail;