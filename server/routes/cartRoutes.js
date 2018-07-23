var router = require('express').Router();
var Cart = require('../models/cart');
var ObjectId = require('mongodb').ObjectID;


router.post('/addCart', (req, res) => {
  var body = req.body;
  // console.log(body);
  var cart = new Cart(body);
  cart.save().then((cart) => {
    res.send(cart);
  })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/getCart/:id', (req, res) => {
  console.log("in getting cart");
  var id = req.params.id;
  Cart.findOne({ _id: new ObjectId(id) }).then((cart) => {
    res.send(cart);
  })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });

});

function getCartById(req, res, next) {
  var cartId = req.body["shoppingCartId"];
  Cart.findOne({ _id: new ObjectId(cartId) }).then((cart) => {
    req.body.cart = cart;
    next();
  })
    .catch((err) => {
      next(err);
    });
};

router.put('/addProductToCart', (getCartById), (req, res) => {
  var body = req.body;
  var cart = req.body;
  var shoppingCart = req.body.cart;
  var product = req.body.product;
  var addOrRemove = req.body.addOrRemove;
  let prod = (shoppingCart["items"])
    .filter((a) => a._id == product._id);
  //If there is zero quantity of product in the cart
  if (prod.length == 0) {
    shoppingCart.items.push({ "product": product, "quantity": 1, "_id": product["_id"] });
  }
  //if product is already present in cart
  else {
    if (addOrRemove)
      prod[0].quantity += 1;
    else
      prod[0].quantity -= 1;
  }
  if (prod.length!=0 && prod[0].quantity == 0) {
    Cart.update({ _id: shoppingCart._id },
      { $pull: { "items": { "product._id": product._id } } },
      null,
      null
    ).then((res1) => {
      console.log(res1);
      res.send(res1);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  }
  else {
    Cart.update({
      _id: shoppingCart._id
    }, {
        $set: {
          "items": shoppingCart.items
        }
      }).then((res1) => {
        console.log(res1);
        res.send(res1);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
});

module.exports = router;