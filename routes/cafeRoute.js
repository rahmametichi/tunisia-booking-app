const router = require("express").Router();
const Cafe = require("../models/Cafe");
const auth = require("../middlewares/auth");
const User = require("../models/User");

router.post("/creerCafe", async (req, res) => {
 
  try {
    const { nom, adresse, phone, description, fb, insta, image } = req.body;
    const existingCafe = await Cafe.findOne({ nom: nom });
    if (existingCafe) {
      res.status(400).json({ msg: "CAFE EXISTE DEJA !!!!!!" });
    } else {
      const cafe = await Cafe.create({
        nom,
        adresse,
        phone,
        description,
        fb,
        insta,
        image,
      });
      res
        .status(200)
        .json({ status: true, msg: "CAFE CREE AVEC SUCCES", data: cafe });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }

});

router.get("/cafesList", async (req, res) => {
  try {
    const cafes = await Cafe.find({});
    res.status(200).json({
      status: true,
      success: true,
      msg: "Liste des Cafés et Restos",
      data: cafes,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

//add Review

router.post("/addreviewc", async (req, res) => {
  const { review, cafeid, currentUser } = req.body;

  const cafe = await Cafe.findById({ _id: cafeid });

  const reviewcmodel = {
    nom: currentUser.nom,
    userid: currentUser._id,
    rating: review.rating,
    comment: review.comment,
  };

  cafe.reviews.push(reviewcmodel);

  var rating =
    cafe.reviews.reduce((acc, x) => acc + x.rating, 0) / cafe.reviews.length;

  cafe.rating = rating;

  cafe.save((err) => {
    if (!err) {
      res.send("Review Successfully Sended ");
    } else return res.status(400).json({ message: "Something wrong!" });
  });
});

module.exports = router;
