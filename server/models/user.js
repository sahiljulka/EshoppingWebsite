var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var jwt=require('jsonwebtoken');
var validator=require('validator');
var bcrypt=require('bcrypt-nodejs');

//Creating User Schema
var UserSchema=new Schema({
	email:{type:String,unique:true,required:true,
			validate: {
	            validator: validator.isEmail,
		        message:`{VALUE} is not an email`
		      }
		  },
	password:{type:String},
	profile:{
		name:{type:String,default:''},
		picture:{type:String,default:''}
	},
	address:{
		type:String
	},
	//To push each item bought by user
	history:[{
		price:Number,
		date:Date,
		//item:
	}]
})

UserSchema.methods.generateToken=function(){
	var user=this;
	var access='auth';
	var token=jwt.sign({_id:this._id.toHexString(),userName:user.profile.name,"access":access},"iMC00l").toString();
	//user.tokens.push({access,token});//console.log(user);
	return user.save().then(()=>{//console.log(token);
		return token;
	});
}

UserSchema.pre('save',function(next){
	var user=this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10,function(err,salt){
		console.log("salt"+salt);
		if(err) return next(err);
		bcrypt.hash(user.password,salt,null,function(err,hash){
			if(err) return next(err);
			user.password=hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword=function(password){
	console.log(password+" "+this.password);
	return bcrypt.compareSync(password,this.password);
};
module.exports = mongoose.model( 'User', UserSchema);