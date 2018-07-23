export interface User {
    email:string,
	password:string,
	profile:{
		name:string,
		picture:string
	},
	address:string,
	//To push each item bought by user
	history:[{
		price:Number,
		date:Date,
		//item:
	}]
}
