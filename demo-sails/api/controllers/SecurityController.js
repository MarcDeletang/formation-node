const cluster = require('cluster')
const bcrypt = require('bcrypt')
let i = 0

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {

  async signup(req, res) {
    const payload = {
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password
    }
    //CHECK PAYLOAD
    const user = await UserService.tryCreate(payload)

    if (user) {
      ///SENDMAIL SIGNUP
      return res.json(user)
    }
    return res.json({ error: 'Duplicate email' })
  },

  async  signin(req, res) {
    try {

      let user = await User.findOne({ email: req.body.email })

      if (!user)
        return res.json({ error: 'No User' })

      bcrypt.compare(req.body.password, user.password, (err, match) => {
        console.log(err, match)
        if (!err && match) {
          req.session.user = user
          return res.json(user)
        }
        return res.json({ error: 'An error occured' })
      })
    }
    catch (e) {
      console.log('error', e)
      return res.json({ error: 'Unknown error' })
    }
  },

  connected(req, res){
    return res.json(req.session.user || 'You are not connected')
  },

  protected(req, res){
    console.log('Enter controller')
    return res.json({ cardKey: '1fs48' })
  },

  test(req, res) {
    const arr = []
    for (let i = 0; i != 99999; ++i) {
      arr.push(getRandomInt(0, 3000))
    }
    arr.sort((a, b) => {
      if (a < b)
        return -1
      if (a > b)
        return 1
      return 0
    })
    //console.log('processId', cluster.worker.id)
    return res.json('ok')
  }

}