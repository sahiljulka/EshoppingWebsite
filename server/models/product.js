var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var productSchema=new Schema({
    title:{
        type:String,
        required:[true,'Title is requried'],
    },
    imageURL:{
        type:String,
        required:[true,'URL is requried'],
    },
    price:{
        type:Number,
        required:[true,'Price is requried'],
        min:0
    },
    category:{
        type:Number,
        required:[true,'Category is required'],
        min:0,
        max:3
    }
});

module.exports = mongoose.model( 'Product', productSchema);
