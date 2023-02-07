const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const order = new Schema({
    data_cre:Date,
    user_id:String,
    item_id:String,
})

// user.pre('save', function(next) {
//     this.data_cre =  new Date();
//     next();
// });

module.exports = mongoose.model("order", order, "order");