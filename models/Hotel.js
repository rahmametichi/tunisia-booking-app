const mongoose = require("mongoose");
const reviewhSchema =  mongoose.Schema ({
  userid: {
      type: mongoose.Schema.Types.ObjectId
  },
  nom: {
      type: String,
      require: true,
  },
  comment: {
      type: String,
  },
  rating: {
      type: Number,
      require: true,
  }

}, {
  timestamps: true
})


const hotelSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
     
    },
    adresse: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    siteweb: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },  reviews:[reviewhSchema]
  },
  { timestamps: true }
);

module.exports = Hotel = mongoose.model("hotels", hotelSchema);
