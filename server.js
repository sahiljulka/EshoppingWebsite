const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const apiRoutes=require('./server/routes/api');
const app=express();
var secret=require('./server/config/secret');
var mongoose=require('mongoose');
var cookieParser=require('cookie-parser');
var userRoutes=require('./server/routes/userRoutes');
var categoryRoutes=require('./server/routes/categoryRoutes');
var productRoutes=require('./server/routes/productRoutes');
var cartRoutes=require('./server/routes/cartRoutes');
var cors=require('cors');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
	
app.use(express.static(path.join(__dirname, 'dist')));


mongoose.connect(secret.database,(err)=>{
	if(err)
		console.log('unable to database');
	else
		console.log('connected to database');
})

app.use(cors());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use('/api',apiRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';

app.listen(port,(req,res)=>{
    console.log(`Server Running on localhost:${port}`)
});