const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item = new Schema({}, { strict: false });

module.exports = mongoose.model("item", item, "item");