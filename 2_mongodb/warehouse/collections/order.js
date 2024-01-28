const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const order = new Schema({
    data_cre:Date,
    user_id:String,
    item_id:String,
})

module.exports = mongoose.model("order", order, "order");