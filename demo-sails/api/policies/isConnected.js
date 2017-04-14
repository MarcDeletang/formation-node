module.exports = function(req, res, next){
  console.log('Enter policy')

  if (req.session.user)
  return next()
  console.log(req.ip, 'Tried to access route protected')
  return res.json('Error')
}