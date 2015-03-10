var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var app =express();
var fb = new Firebase("https://fiery-fire-7461.firebaseio.com");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'March Pool' });
  // console.log('the requset is here ', req);

});

router.post('/', function(req, res, next){

  fb.push({
    name: req.body['input-name'],
    meeting: req.body['input-meeting'],
    destination: req.body['input-destination'],
    time: req.body['input-time'],
    address: req.body['input-address'],
    phone: req.body['input-phone']
  });
 
  res.render('index', { title: 'A post request was sent'});
});


fb.on("value", function(data) {
  var name = data.val() ? data.val().meeting : "";
  var time = data.val() ? data.val().time : "";
  var destination = data.val() ? data.val().destination : "";
});

module.exports = router;
