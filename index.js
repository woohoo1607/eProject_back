// подключение express
const express = require("express");
// создаем объект приложения
const app = express();
//const bodyParser = require('body-parser');
// определяем обработчик для маршрута "/"
const routes = require('./routes/routes');
app.use(express.static(__dirname + "/static/"));    //разрешаем использовать папку static
app.use("/public", express.static(__dirname + "/public"));
//app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, {useNewUrlParser: true});

mongoClient.connect(function (err, client) {
    if (err)
        return console.log(err);
    routes(app, client);
});


app.get("/", function (request, response) {

    // отправляем ответ
    response.sendFile(__dirname + "/static/home.html");
});
// начинаем прослушивать подключения на 5000 порту
app.listen(5000);
