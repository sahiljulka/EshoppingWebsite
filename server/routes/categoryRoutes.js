var router=require('express').Router();

router.get('/getCategories',(req,res)=>{
    res.send([{'key':0,'value':'Fruits'},{'key':1,'value':'Vegetables'},{'key':2,'value':'Breads'},{'key':3,'value':'Dairy'}
    ,{'key':4,'value':'Beverages '}]);
});



module.exports=router;

