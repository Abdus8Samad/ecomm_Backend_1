const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    category:{ type:mongoose.Schema.Types.ObjectId, ref:'Category' },
    name:String,
    price:String,
    image:String
})

const Product = mongoose.model('Product',productsSchema);

module.exports = Product;