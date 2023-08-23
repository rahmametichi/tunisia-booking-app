const router = require("express").Router();
const Musee = require("../models/Musee");
const auth = require("../middlewares/auth");
const User = require("../models/User");

// @desc create musee
// @ /api/musees/creerMusee
// @ post request

router.post("/creerMusee", auth, async (req, res) => {

  try {
    const {
      nom,
      region,
      image1,
      image2,
      image3,
      description,
      adresse,
      collectionDescription1,
      collectionDescription2,
      collectionDescription3,
      collectionImage1,
      collectionImage2,
      collectionImage3,
    } = req.body;
    const existingMusee = await Musee.findOne({ nom: nom });
    //vérifier si le muséé existe déja ou nn
    if (existingMusee) {
      res.status(400).json({ msg: "MUSEE EXISTE DEJA !!!!!!" });
    } else {
      //création d'un nouveau muséé
      const musee = await Musee.create({
        nom,
        region,
        image1,
        image2,
        image3,
        description,
        adresse,
        collectionDescription1,
        collectionDescription2,
        collectionDescription3,
        collectionImage1,
        collectionImage2,
        collectionImage3,
      });
      res.status(200).json({ status: true, msg: "MUSEE CREE AVEC SUCCES" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
 
});

// @desc get all musee
// @ /api/musees/museesList
// @ get request

router.get("/museesList", async (req, res) => {
  try {
    const musees = await Musee.find({});
    res.status(200).json({
      status: true,
      success: true,
      msg: "Liste de Musees",
      data: musees,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

// @desc update musee
// @ /api/musees/modifierMusee
// @ update request
router.put("/modifierMusee/:id", async (req, res) => {

    try {
      //déstructuration de l'id de musee
      const { id } = req.params;
      //vérifier si le musee existe
      let musee = await Musee.findById(id);
      if (musee) {
        const newMusee = await Musee.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );
        res.status(200).json({
          status: true,
          message: "MUSEE MODIFIE AVEC SUCCES",
          data: newMusee,
        });
      } else {
        res.status(404).json({ status: true, message: "MUSEE INTROUVABLE" });
      }
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }

});

// @desc delete musee
// @ /api/musees/supprimerMusee
// @ delete request

router.delete("/supprimerMusee/:id", auth, async (req, res) => {

    try {
      //déstructuration de l'id de musee
      const { id } = req.params;

      let musee = await Musee.findById(id);
      //vérifier si le musee existe
      if (musee) {
        //suppression
        await Musee.findByIdAndDelete(id);
        res
          .status(200)
          .json({ status: true, message: "MUSEE SUPPRIME AVEC SUCCES" });
      } else {
        res.status(404).json({ status: true, message: "MUSEE INTROUVABLE" });
      }
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
 
});

// @desc get musee by id
// @ /api/museesdetails/:_id'
// @ get request
router.get("/museesdetails/:id", async (req, res) => {
  const { museeid } = req.params;
  try {
    const liste = await Musee.find({ museeid: museeid }).sort({ _id: -1 });

    res
      .status(200)
      .json({ status: true, msg: " Liste des musées", data: liste });
  } catch (error) {
    return res.status(400).json({ msg: "SOMETHING WENT WRONG" });
  }
});

//add Review

router.post("/addreview", async (req, res) => {
  const { review, museeid, currentUser } = req.body;

  const musee = await Musee.findById({ _id: museeid });

  const reviewmodel = {
    nom: currentUser.nom,
    userid: currentUser._id,
    rating: review.rating,
    comment: review.comment,
  };

  musee.reviews.push(reviewmodel);

  var rating =
    musee.reviews.reduce((acc, x) => acc + x.rating, 0) / musee.reviews.length;

  musee.rating = rating;

  musee.save((err) => {
    if (!err) {
      res.send("Review Successfully Sended ");
    } else return res.status(400).json({ message: "Something wrong!" });
  });
});

module.exports = router;
