var express = require('express');
var router = express.Router();
var Firebase = require('firebase');

var fb = new Firebase("https://fiery-fire-7461.firebaseio.com");


fb.set({ name: "Alex Wolfe" });
fb.on("value", function(data) {
  var name = data.val() ? data.val().name : "";
  // alert("My name is " + name);
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'March Pool' });
});

module.exports = router;
