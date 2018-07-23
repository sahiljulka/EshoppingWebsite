var User=require('../models/user');
var router=require('express').Router();
var _=require('lodash');
var jwt=require('jsonwebtoken');
var authenticate=require('../authentication').authenticate;


router.get('/log',(req,res)=>{
    res.cookie("hello",{"name":"yes i am here"}).status(200)
        .send("hello i am cool");
});



router.post('/signup',(req,res)=>{
    var body=_.pick(req.body,['email','password','profile']);
    var user=new User(body);
    User.findOne({email:user.email},(err,existingEmail)=>{
        if(existingEmail){
            res.status(412).send(`Email ${user.email} already exists`);
        }
        else{
            user.save().then((user)=>{
                    return user.generateToken();
            }).then((token)=>{
                console.log("signup");
                // res.redirect('/user');
                console.log(token);
                res.cookie('token', token,
                { 
                    maxAge: 900000, httpOnly: false
                }).status(200).send({a:"hellO"})
                }).catch((e)=>{
                    res.status(400).send(e);
                });
        }
    });
});

router.get('/cool',(req,res)=>{
    return res.redirect('/user');//.send("user is back");    
})
router.get('/user',(req,res)=>{
    res.send("COOL is back");
});

router.post('/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);
    User.findOne({email:user.email},(err,existingUser)=>{
        if(err){
            res.status(412).send(`Email ${user.email} does not exist`);
        }
        else
        {
            if(existingUser==null){
                res.status(412).send(`Email ${user.email} does not exist`);
            }
            else
            {
                var user1 =new User(existingUser);
                if(existingUser.comparePassword(user.password)){
                    user1.generateToken().then((token)=>{
                         res.cookie('token', token, {
                            expires: new Date(Date.now() + 9999999),
                            httpOnly: false,
                            secure:false
		                }).status(200).send(user1);
                    });
                }
                else{
                    res.status(412).send("Password does not match");
                }
            }
        }
    });
});
module.exports=router;