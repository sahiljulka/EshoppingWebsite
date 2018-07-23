var router=require('express').Router();
var Product=require('../models/product');
var mongoose = require('mongoose');
var assert=require('assert');

router.post('/addproduct',(req,res)=>{
    var product=new Product(req.body);
    console.log(product);
    //var error=product.validateSync();
    // console.log(error);
    // res.send(error);
    product.save().then((prod)=>{
        res.send(prod);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});

router.get('/getProducts',(req,res)=>{
    Product.find({}).then((res1)=>{
        res.send(res1);
    })
});


router.get('/getProduct/:id',(req,res)=>{
    // var id = mongoose.Types.ObjectId(req.params.id);
    var id=req.params.id;
    Product.findOne({"_id":id}).then((res1)=>{
        if(Object.keys(res1).length==0){
            res.send("No product found");
            return;
        }
        res.send(res1);
    })
    .catch((err)=>{
        res.send(err);
    });
});

router.put('/editProduct',(req,res)=>{
    var obj=req.body;
    Product.update(
        {_id:obj._id},
        {
            $set:{
                "title":obj.title,
                "price":obj.price,
                "category":obj.category,
                "imageURL":obj.imageURL
            }
        }
    ).then((res1)=>{
        res.send(res1);
    }).catch((err)=>{
        res.send(err);
    });
});

router.delete('/deleteProduct/:id',(req,res)=>{
   var id=req.params.id;
    console.log(id)   
   Product.remove({_id:id}).then((res1)=>{
       console.log(res1);
       
        res.send(res1);
   })
   .catch((err)=>{
       console.log(err);
        res.send(err);
   });
});

module.exports=router;