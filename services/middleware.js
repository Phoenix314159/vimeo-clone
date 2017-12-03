const session = require('express-session'),
  {redirect_URL, SESSION_SECRET} = require('../config/config'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    corsOptions = {
        origin: redirect_URL
    };

module.exports = app => {
    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        rolling: true
    }));
}


