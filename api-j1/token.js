const jwt = require('jsonwebtoken'),
  key = 'omgthisissuchasecretkeythisisawesome'


module.exports.init = function(app){
  app.get('/token', (req, res)=>{
    ///Retourne un token
  })

  //Rajouter les middlewares qui vont vérifier si le token a été envoyé avec req.query.token
  //Si le token est valide, mettre le payload to token dans req.token et passer au middleware suivant
  app.use('/item', (req, res, next)=>{
    console.log(req.query.token)
    next()
    //Verify & decline | allow
  })

}



// jwt.sign({
//   idUser: 45
// }, key, { expiresIn: '5s' }, (err, token) => {
//   console.log('token', token, err)

//   setTimeout(() => {

//     jwt.verify(token, key, function (err, decoded) {
//       console.log('decoded', decoded, err)
//     })


//   }, 2000)

// })
