var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', function(req, req, next){
  res.send('something goes here')
})

module.exports = router;
