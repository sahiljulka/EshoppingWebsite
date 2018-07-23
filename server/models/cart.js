var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var item={
    product: 
    {
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
        },
        __v:{
            type:Number
        },
        _id:{
            type:String
        }
    },
    quantity:Number
};
var cartSchema=new Schema({
    dateCreated:{
        type:Date
    },
    items:{
        type:[item]
    }
});

module.exports=mongoose.model('Cart',cartSchema);