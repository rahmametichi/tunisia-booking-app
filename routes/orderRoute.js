const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51L7haGEDWZpQCiil7MYLL0o9DZtEFcGhWS51sOulwgHivknidbznwEPS6gwsXqPFwPUtU1iFZYlQVlyVtGyIuFqF00YwpBW2VB"
);
const Order = require("../models/Order");

router.post("/placeorder", async (req, res) => {
    const { token, cartItems, subtotal, decoded  } = req.body;
  
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
  
    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "TTD",
        customer: customer.id,
        receipt_email: token.email,
      },
     
    );
  
    if (payment) {
      const order = new Order({
        userid: decoded.id,
        nom: decoded.nom,
        email: decoded.email,
        orderItems: cartItems,
        shippingAddress: {
          address: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          postalCode: token.card.address_zip,
        },
        orderAmount: subtotal,
        transactionId: payment.source.id,
        isDelivered: false,
      });
  
      order.save((err) => {
        if (err) {
          return res.status(400).json({ message: "Somethnig wrong!" });
        } else {
          return res.send("Order Placed Successfully");
        }
      });
    } else {
      return res.status(400).json({ message: "Payment Failed!" });
    }
  
  
  });

  router.post("/getordersbyuserid", (req, res) => {
    const userid = req.body.userid
  
    Order.find({ userid: userid }, (err, docs) => {
      if(err)
      {
        res.status(400).json({ message: "Something wrong!" });
      }
      else{
        res.send(docs)
      }
    });
  });

  
router.get("/getallorders", (req, res) => {
  Order.find({}, (err, docs) => {
    if(err)
    {
      res.status(400).json({ message: "Something wrong!" });
    }
    else{
      res.send(docs)
    }
  });

});
  module.exports = router;
