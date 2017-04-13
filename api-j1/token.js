const jwt = require('jsonwebtoken'),
  key = 'omgthisissuchasecretkeythisisawesome'


function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, { expiresIn: '50s' }, (error, token) => {
      if (error)
        return reject(error)
      return resolve(token)
    })
  })
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (error, payload) => {
      if (error)
        return reject(error)
      return resolve(payload)
    })
  })
}


function tokenCheker(req, res, next) {
  console.log('token sent', req.query.token)
  verify(req.query.token).then(payload => {
    req.tokenData = payload
    next()
  })
    .catch(err => {
      console.log('err', err)
      return res.json({ err })
    })
  //Verify & decline | allow
}




module.exports.init = function (app) {
  app.get('/token', (req, res) => {
    ///Retourne un token
    sign({ data: 'hello world' }).then(token => {
      return res.json({ token })
    })
      .catch(err => {
        return res.json({ err })
      })
  })

  //Rajouter les middlewares qui vont vérifier si le token a été envoyé avec req.query.token
  //Si le token est valide, mettre le payload to token dans req.token et passer au middleware suivant
  app.use('/item', tokenCheker)
  app.use('/item/:idItem', tokenCheker)

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
