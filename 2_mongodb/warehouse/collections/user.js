const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    data_cre:Date,
    name:String,
    surname:String,
})

user.pre('save', function(next) {
    this.data_cre =  new Date();
    next();
});

module.exports = mongoose.model("user", user, "user");