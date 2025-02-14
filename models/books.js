const mongoose = require('mongoose');
const multer = require('multer');
const imagePath = '/uploads';
const path = require('path');

const BookStoreSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    genre : {
        type : Array,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    publishedDate : {
        type : Date,
        required : true
    },
    publisher : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        required : true
    },
});

const storageImage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null , path.join(__dirname,"..",imagePath));
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now());
    }
});

BookStoreSchema.statics.uploadImageFile = multer({storage : storageImage}).single('image');
BookStoreSchema.statics.imgPath = imagePath;

const BookStore = mongoose.model('BookStore',BookStoreSchema);

module.exports = BookStore;