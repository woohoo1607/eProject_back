const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
   login: {
       type: String,
       unique: true,
       required: true
   },
   password: {
       type: String,
       required: true
   }
});

module.exports = mongoose.model('users', userSchema);