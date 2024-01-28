const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    data_cre:Date,
    name:String,
    surname:String
})

module.exports = mongoose.model("user", user, "user");