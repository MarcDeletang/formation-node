const express = require('express'),
 app = express(),
 bodyParser = require('body-parser'),
 api = require('./api.js'),
 tokenVerifier = require('./token.js'),
 port = 1337


//https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
tokenVerifier.init(app)
api.init(app)

app.use(express.static('www'))

app.listen(port, ()=>{
  console.log('Listening', port)
})