var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var app =express();
var fb = new Firebase("https://fiery-fire-7461.firebaseio.com");
var Imap= require('imap'); 
var MailParser = require("mailparser").MailParser;
var MailListener = require("mail-listener");
var mailparser = new MailParser();
var $ = require('jQuery');
    



// //email MarchPool@mail.com pw MarchPool born in apr 1 2000 from MarchPool customer number 235447626
// var inspect = require('util').inspect;
// var imap = new Imap({
//   user: 'atj1979@gmail.com',
//                                                                                                                 password: '',
//   host: 'imap.gmail.com',
//   port: 993,
//   tls: true
// });

// function openInbox(cb) {
//   imap.openBox('INBOX', true, cb);
// }

// imap.once('ready', function() {
//   openInbox(function(err, box) {
//     if (err) throw err;
//     var f = imap.seq.fetch('1:3', {
//       bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
//       struct: true
//     });
//     f.on('message', function(msg, seqno) {
//       console.log('Message #%d', seqno);
//       var prefix = '(#' + seqno + ') ';
//       msg.on('body', function(stream, info) {
//         var buffer = '';
//         stream.on('data', function(chunk) {
//           buffer += chunk.toString('utf8');
//         });
//         stream.once('end', function() {
//           console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
//         });
//       });
//       msg.once('attributes', function(attrs) {
//         console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
//       });
//       msg.once('end', function() {
//         console.log(prefix + 'Finished');
//       });
//     });
//     f.once('error', function(err) {
//       console.log('Fetch error: ' + err);
//     });
//     f.once('end', function() {
//       console.log('Done fetching all messages!');
//       imap.end();
//     });
//   });
// });

// imap.once('error', function(err) {
//   console.log(err);
// });

// imap.once('end', function() {
//   console.log('Connection ended');
// });

// imap.connect();



























// var mailListener = new MailListener({
//   username: "atj1979@gmail.com",
//                                                                                                                                   password: "",
//   host: "imap.gmail.com",
//   port: 993, // imap port
//   secure: true, // use secure connection
//   mailbox: "INBOX", // mailbox to monitor
//   markSeen: true, // all fetched email willbe marked as seen and not fetched next time
//   fetchUnreadOnStart: true // use it only if you want to get all unread email on lib start. Default is `false`
// });

// mailListener.start();

// mailListener.on("server:connected", function(){
//   console.log("imapConnected");
// });

// mailListener.on("mail:arrived", function(id){
//   console.log("new mail arrived with id:" + id);
// });

// mailListener.on("mail:parsed", function(mail){
//   // do something with mail object including attachments
//   console.log("emailParsed", mail.attachments);
//   // mail processing code goes here
// });


// var email = "From: 'Sender Name' <sender@example.com>\r\n"+
//             "To: 'Receiver Name' <receiver@example.com>\r\n"+
//             "Subject: Hello world!\r\n"+
//             "\r\n"+
//             "How are you today?";

// // setup an event listener when the parsing finishes
// mailparser.on("end", function(mail_object){
//     console.log("From:", mail_object.from); //[{address:'sender@example.com',name:'Sender Name'}]
//     console.log("Subject:", mail_object.subject); // Hello world!
//     console.log("Text body:", mail_object.text); // How are you today?
// });

// // send the email source to the parser
// mailparser.write(email);
// mailparser.end();
































// fb.on("value", function(snapshot) {
//   console.log(snapshot.val());

// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });



/* GET home page. */
router.get('/', function(req, res, next) {
  var obj;
  fb.once('value', function (snapshot){
    obj= snapshot.val();
    console.log('got snapshot - output to terminal');
  });
  var data = '';
  var counter = 0;
  container ={};
  for (var key in obj){
    counter++;
    container["listItem"+counter];
    container["listItem"+counter] = {}; 
    container["listItem"+counter].meeting = obj[key].meeting;
    container["listItem"+counter].destination = obj[key].destination,
    container["listItem"+counter].time = obj[key].time
    
  }


  
  res.render('index', { 
    title: 'Welcome to March Pool',
    data1: container
  });
  

  

});

router.post('/', function(req, res, next){

  fb.push({
    
    meeting: req.body['input-meeting'],
    destination: req.body['input-destination'],
    time: req.body['input-time'],
    
    phone: req.body['input-phone']
  });
  // fb.on('child_added',)
    var obj;
  fb.once('value', function (snapshot){
    obj= snapshot.val();
    console.log('got snapshot - output to terminal');
  });
  var data = '';
  var counter = 0;
  container ={};
  for (var key in obj){
    counter++;
    container["listItem"+counter];
    container["listItem"+counter] = {}; 
    container["listItem"+counter].meeting = obj[key].meeting;
    container["listItem"+counter].destination = obj[key].destination,
    container["listItem"+counter].time = obj[key].time
    
  }

  res.render('index', { title: 'A post request was sent',
    data1: container
  });
});


fb.on("value", function(data) {
  var name = data.val() ? data.val().meeting : "";
  var time = data.val() ? data.val().time : "";
  var destination = data.val() ? data.val().destination : "";
});

module.exports = router;
