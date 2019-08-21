const mongoose = require('mongoose');
const empl = require("../models/employeeSchema");
//const usr = require("../models/userSchema");
const uri = "mongodb://localhost:27017/ecp";
const mongooseOption = {useNewUrlParser: true};
const crypto = require('crypto');

/*function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64');
}*/
const router = (app) => {
    
    app.get("/employees/", function (request, response) {

/*       var user = {
         login: "woohoo",
         password: hash("123")
       };
*/       
       
        let r = {
            
        };
        let isLimit = false;
        let isSkip = false;
        let skip = 0;
        let limit = 10;
        
        if (request.query.name) {
            r.name = request.query.name;
        }
        if (request.query.limit) {
            isLimit = isFinite(request.query.limit);
            if(isLimit) {
               request.query.limit==0 ? limit : limit = Math.ceil(Math.abs(request.query.limit));
               
            }
             
        } 
        
        if (request.query.page) {
            isSkip = isFinite(request.query.page);
            if(isSkip) {
            request.query.page==0 ? skip : skip = Math.ceil(Math.abs(request.query.page))*limit-limit;
                
            }
        }
        

        let result = () =>
        {
            mongoose.connect(uri, mongooseOption);
            empl.find().skip(skip).limit(limit).then(function (results) {
                empl.find().countDocuments().then (function (cnt) {
                    //response.setHeader('Access-Control-Allow-Origin', '*');
                    //response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                    response.json({employees: results, countAll:cnt});
                    //new usr(user).save();
                    mongoose.disconnect();
                });
            }, function (err) {
                console.error('Error!!!', err, err.stack);
            });
        };

        result();

    });

};

module.exports = router;