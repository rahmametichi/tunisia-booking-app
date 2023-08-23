const router = require("express").Router();
const Hotel = require("../models/Hotel");
const auth = require("../middlewares/auth");
const User = require("../models/User");

router.post("/creerHotel", async (req, res) => {
  // const user = await User.findOne({ isAdmin: true });
  // if (user) {
  try {
    const { nom, adresse, phone, email, siteweb, image } = req.body;
    const existingHotel = await Hotel.findOne({ email: email });
    if (existingHotel) {
      res.status(400).json({ msg: "HOTEL EXISTE DEJA !!!!!!" });
    } else {
      const hotel = await Hotel.create({
        nom,
        adresse,
        phone,
        email,
        siteweb,
        image,
      });
      res
        .status(200)
        .json({ status: true, msg: "HOTEL CREE AVEC SUCCES", data: hotel });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
  // } else {
  //   res.status(500).json(console.log({ msg: "Permission denied" }));
  // }
});

router.get("/hotelsList", async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({
      status: true,
      success: true,
      msg: "Liste des Hotels",
      data: hotels,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

//add Review

router.post("/addreviewh", async (req, res) => {
  const { review, hotelid, currentUser } = req.body;

  const hotel = await Hotel.findById({ _id: hotelid });

  const reviewhmodel = {
    nom: currentUser.nom,
    userid: currentUser._id,
    rating: review.rating,
    comment: review.comment,
  };

  hotel.reviews.push(reviewhmodel);

  var rating =
    hotel.reviews.reduce((acc, x) => acc + x.rating, 0) / hotel.reviews.length;

  hotel.rating = rating;

  hotel.save((err) => {
    if (!err) {
      res.send("Review Successfully Sended ");
    } else return res.status(400).json({ message: "Something wrong!" });
  });
});

module.exports = router;
