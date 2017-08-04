const session = require('express-session'),
    app = require('../server'),
    config = require('../config');

app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    rolling: true
}));

