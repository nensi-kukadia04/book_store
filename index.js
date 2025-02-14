const express = require('express');
const port = 9000;
const app = express();
const path=require('path');

const db = require('./config/dataBase');
const BookStore = require('./models/books');

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'assets')));
app.use("/uploads",express.static(path.join(__dirname,'uploads')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/' , async (req,res)=>{
    const book = await BookStore.find();
    res.render('home',{
        book
    });
});

app.post('/insertData',BookStore.uploadImageFile , async (req,res)=>{
    var imagePath = '';
    if(req.file){
        imagePath = BookStore.imgPath+"/"+req.file.filename;
    }
    req.body.image = imagePath;
    await BookStore.create(req.body);
    return res.redirect('back');
});

app.get('/viewData/:bookId', async (req,res)=>{
    let singleBook = await BookStore.findById(req.params.bookId);
    req.body.image=singleBook.image;
    return res.render('viewBook',{
        singleBook
    });
})

app.listen(port,(err)=>{
    err?console.log(err):console.log("Server is running on http://localhost:"+port);
})