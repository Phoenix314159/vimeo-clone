const express = require('express'),
    app = module.exports = express(),
    config = require('./config.js'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    vimeoCtrl = require('./vimeoCtrl'),
    mainCtrl = require('./mainCtrl'),
    corsOptions = {
        origin: config.redirect_URL
    };
require('./services/session');
require('./routes/get')(app);
require('./routes/post')(app);

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/dist'));

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})
