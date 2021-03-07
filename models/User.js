const { Schema, model } = require('mongoose');


const User = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkTwitter: String,
  linkFacebook: String,
  linkLinkedin: String,
  linkTelegram: String,
  linkVK: String
})


module.exports = model('User', User)
