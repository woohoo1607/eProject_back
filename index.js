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
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);

app.use(session({
  secret: 'i need more beers',
  cookie: {maxAge:360000, secure: false, httpOnly: true},
  resave: false,
  saveUninitialized: false,
  // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
  store: new MongoStore({ 
    url: 'mongodb://localhost:27017/ecp',
    autoRemove: 'disabled'
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
