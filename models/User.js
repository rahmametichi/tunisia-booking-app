const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },

  motdepasse: {
    type: String,
    required: true,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  }
},{timestamps:true});

module.exports = User = mongoose.model("user", userSchema);
