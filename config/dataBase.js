const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/imageTask_2');

const db = mongoose.connection;

db.once('open', (err)=>{
    err?console.log(err):console.log("DataBase is connected successfully");
    
});

module.exports = db;