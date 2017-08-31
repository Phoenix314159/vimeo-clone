const session = require('express-session'),
    config = require('../config/config'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    corsOptions = {
        origin: config.redirect_URL
    };

module.exports = app => {
    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use(session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        rolling: true
    }));
}


