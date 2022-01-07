const mongoose = require('mongoose')


const ConnectMongo =()=>{
    mongoose.connect('mongodb://localhost:27017/NoteBookCloud')
    console.log("Mongodb Connected Sucessfully")
}

module.exports = ConnectMongo