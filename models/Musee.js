const mongoose = require('mongoose')

const reviewSchema =  mongoose.Schema ({
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


const museeSchema = new mongoose.Schema({

    nom: {
        type : String ,
        required : true ,
    },

    region : {
        type : String , 
        required : true,
    } , 
    image1 : {
        type : String ,
        required:true,
    } ,  image2 : {
        type : String ,
        required:true,
    } ,  image3 : {
        type : String ,
        required:true,
    } ,
    description : {
        type : String , 
        required:true,
    },
    adresse : {
        type : String , 
        required : true , 
    },
    prix : {
        type : Number ,
        required :true,
    },
    collectionImage1 : {
        type:String,
        required:true,
    }, collectionImage2 : {
        type:String,
        required:true,
    }, collectionImage3 : {
        type:String,
        required:true,
    },
    collectionDescription1 : {
        type:String,
        required:true,
    }, 
    collectionDescription2 : {
        type:String,
        required:true,
    }, 
    collectionDescription3 : {
        type:String,
        required:true,
    }, 
    reviews:[reviewSchema]
},{timestamps:true})


module.exports = Musee = mongoose.model("musees", museeSchema);
