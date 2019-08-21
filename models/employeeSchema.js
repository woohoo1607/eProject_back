const mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: {
       type: String,
       required: true
   },
   surname: {
       type: String,
       required: true
   },
   patronymic: {
       type: String,
       required: true
   },
   birthday: {
       type: String,
       required: true
   },
   departament: String,
   code: Number,
   keyword: String,
   password: String,
   fired: Boolean,
   transported: Boolean,
   expirationDateSertificate: String,
   isResponsible: Boolean,
   lastModified: {
       type: Date,
       default: Date.now
   }
});

module.exports = mongoose.model('employees', employeeSchema);