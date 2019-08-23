// подключение express
const express = require("express");
// создаем объект приложения
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//const bodyParser = require('body-parser');
// определяем обработчик для маршрута "/"
const routes = require('./routes/routes');
const auth = require('./routes/auth');
app.use(express.static(__dirname + "/static/"));    //разрешаем использовать папку static
app.use("/public", express.static(__dirname + "/public"));
//app.use(bodyParser.urlencoded({extended: true}));
const allowCrossDomain = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'PROPFIND, PROPPATCH, COPY, MOVE, DELETE, MKCOL, LOCK, UNLOCK, PUT, GETLIB, VERSION-CONTROL, CHECKIN, CHECKOUT, UNCHECKOUT, REPORT, UPDATE, CANCELUPLOAD, HEAD, OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);

app.use(session({
  secret: 'i like code and beer',
  cookie: {maxAge:7776000000, secure: false, httpOnly: true},
  resave: false,
  saveUninitialized: false,
  // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
  store: new MongoStore({ 
    url: 'mongodb://localhost:27017/ecp',
    autoRemove: 'interval',
    autoRemoveInterval: 1
  })
}));

routes(app);
auth(app);


app.get("/", function (request, response) {

    // отправляем ответ
    response.sendFile(__dirname + "/static/home.html");
});
// начинаем прослушивать подключения на 5000 порту
app.listen(5000);
