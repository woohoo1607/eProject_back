const mongoose = require('mongoose');
const user = require("../models/userSchema");
const api = require("./api");
const uri = "mongodb://localhost:27017/ecp";
const mongooseOption = {useNewUrlParser: true};
const crypto = require('crypto');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});


function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64');
}
const auth = (app) => {

    app.get('/auth', function (req, res) {
        console.log(req.session);
        if (!req.session.user) {
            return res.json({userData: {}, responseCode: 1, message: "You are not login"});
        }
        api.findUser(req.session.user)
                .then(function (user) {
                    if (user) {
                        return res.json({userData: {id: user._id, login: user.login}, responseCode: 0, message: null});
                    } else {
                        return res.json({userData: {}, responseCode: 1, message: "User is not corrected"});;
                    }
        }).catch(function (error) {
            return res.json({userData: {}, responseCode: 1, message: {error}});;
        });
    });

    app.post('/auth', urlencodedParser, function (req, res) {
        if (req.session.user){
            console.log("You are login");
            return res.json({responseCode: 0, message: null});
        }console.log(req.body);
        api.checkUser(req.body)
                .then(function (user) {
                    if (user) {
                        req.session.user = {id: user._id, login: user.login};
                        req.session.save();
                        console.log(req.session);
                        return res.json({responseCode: 0, message: null});
                    } else {
                        return res.json({responseCode: 1, message: "Login or password not correct"});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    return res.json({responseCode: 1, message: error});
                });

    });

    app.post('/logout', urlencodedParser, function (req, res) {
        console.log(req.session.user);
        if (req.session.user) {
            delete req.session.user;
            console.log(req.session.user);
            res.json({responseCode: 0, message: null});
        }
    });

};


module.exports = auth;