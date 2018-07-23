var authenticate = function (req, res, next) {
  var token=req.cookies.token;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
   
    jwt.verify(token, "iMC00l", function(err, decoded) {
        console.log("decoded "+JSON.stringify(decoded));
        console.log("err"+JSON.stringify(err));
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        res.status(200).send(decoded);
        next();
    });
 
}

module.export={authenticate};