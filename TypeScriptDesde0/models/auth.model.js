// models/auth.model.js
const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
  {
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

const AuthUser = mongoose.model('AuthUser', authSchema);
module.exports = AuthUser;