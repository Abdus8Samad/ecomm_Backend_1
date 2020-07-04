const mongoose = require('mongoose');

const categSchema = new mongoose.Schema({
    name:{ type:String, unique:true, lowercase:true}
})

const Category = mongoose.model('Category',categSchema);

module.exports = Category;