const  mongoose  = require("mongoose");

const orderSchema = mongoose.Schema({

    userid :{
        type: String,
        require
    },
    nom : {
        type: String,
        require
    },
    email : {
        type: String,
        require
    },

    orderItems:[{
        nom : { type: String, require}, 
        id :{ type : String, require},
        prix :{ type : Number, require}
    }],

  shippingAddress : {
      address : { type: String, require},
      city : { type: String, require},
      postalCode : { type: Number, require},
      country : { type: String, require},
  },

  orderAmount : { type : Number, require},
  transactionId : { type:String, require},
  isDelivered :{ type: Boolean, require}


}, {
    timestamps: true
})

const Order = mongoose.model('orders' , orderSchema)
module.exports = Order