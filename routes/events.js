var express = require('express');
var router = express.Router();
var Firebase = require('firebase');

var fb = new Firebase("https://fiery-fire-7461.firebaseio.com");

fb.on("value", function(data) {
  var name = data.val() ? data.val().name : "";
  var meeting = data.val() ? data.val.meeting : ""
  // render;
});