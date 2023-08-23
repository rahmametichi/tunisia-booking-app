const mongoose = require("mongoose");

const reviewcSchema =  mongoose.Schema ({
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


const cafeSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
      unique:true,
    },
    fb: {
      type: String,
      required: true,
    },
    insta: {
        type: String,
        required: true,
      },
    image: {
      type: String,
      required: true,
    },  reviews:[reviewcSchema]
  },
  { timestamps: true }
);

module.exports = Cafe = mongoose.model("cafes", cafeSchema);
