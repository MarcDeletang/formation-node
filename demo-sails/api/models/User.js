/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt')


module.exports = {
  // autoCreatedAt: false,
  // autoCreatedAt: false,

  attributes: {
    email: {
      type: 'string',
      unique: true
    },

    firstName: {
      type: 'string'
    },

    password: {
      type: 'string'
    },

    salt: {
      type: 'string'
    },

    toJSON() {
      delete this.password
      delete this.salt
      this.test = 'omg'
      return this
    },

    isAdmin() {
      return this.firstName == 'marc'
    }

  },

  getAdmins(){
    return User.find({ firstName: 'marc' })
  },

  beforeCreate(data, next) {

    bcrypt.genSalt(10, function (err, salt) {

      bcrypt.hash(data.password, salt, function (err, hash) {
        // Store hash in your password DB.
        console.log('salt', salt)
        console.log('hash', hash)
        data.salt = salt
        data.password = hash
        next()
      })

    })
  }



}

