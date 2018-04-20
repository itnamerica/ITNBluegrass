var express = require('express');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var app = express();
var env = require(__dirname + '/env-vars.js');
var gmail_login = env.gmail_login;
var gmail_pass = env.gmail_pass;

app.use(express.json()); //convert req to json
app.use(express.static(__dirname + '/app'));


var allPages = ['/home','/what-we-do','/organization','/faces','/faq','/news','/contact','/become-member','/member-app','/volunteer-to-drive','/volunteer-app','/family','/member-programs','/pay-online','/donate','/corporate'];

app.use(allPages, function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

app.post('/sendmail', function(req, res){
  console.log('post req', req.body);

    let transporter = nodemailer.createTransport(smtpTransport({
       service: "Gmail",  // sets automatically host, port and connection security settings
       auth: {
           user: gmail_login,
           pass: gmail_pass
       }
    })
  )
  let mailOptions = {};
  if (req.body && req.body.pdf){
    console.log('sending email with pdf');
    mailOptions = {
        from: req.body.from, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line   
        text: JSON.stringify(req.body.text), // plain text body
        bcc: 'info@bluegrass.org',
        attachments: [{path: req.body.pdf}]
    };
  }
  else if (req.body && req.body.html){
    console.log('sending email without pdf');
    mailOptions = {
        from: req.body.from, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line   
        text: JSON.stringify(req.body.text), // plain text body
        bcc: 'info@bluegrass.org',
        html: req.body.html // html body
    };
  } else {
    console.log('sending email with neither');
    mailOptions = {
        from: req.body.from, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line   
        text: JSON.stringify(req.body.text), // plain text body
        bcc: 'info@bluegrass.org',
    };
  }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // transporter.close();
    });
  
  res.end();
});

app.listen(process.env.PORT || 13270);

