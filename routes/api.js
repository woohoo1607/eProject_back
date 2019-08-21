const mongoose = require('mongoose');
const user = require("../models/userSchema");
const uri = "mongodb://localhost:27017/ecp";
const mongooseOption = {useNewUrlParser: true};
const crypto = require('crypto');

exports.checkUser = function (userData) {
    mongoose.connect(uri, mongooseOption);
    return user
            .findOne({login: userData.name})
            .then(function (doc) {
                if (doc) {
                    if (doc.password == hash(userData.password)) {
                        console.log("User password is ok");
                        mongoose.disconnect();
                        return Promise.resolve(doc);
                    } else {
                        return Promise.reject(null);
                        mongoose.disconnect();
                    }
                } else {
                    return doc;
                }
            });
};

exports.findUser = function (userData) {
    mongoose.connect(uri, mongooseOption);

    return user
            .findOne({login: userData.login})
            .then(function (res) {
                mongoose.disconnect();
                return res;
            }, function (err) {
                mongoose.disconnect();
                return err;
            });
};

function hash(text) {
    return crypto.createHash('sha1')
            .update(text).digest('base64');
}
;