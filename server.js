const express = module.exports = require('express'),
    app = module.exports = express(),
    config = require('./config.js'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    vimeoCtrl = require('./vimeoCtrl'),
    mainCtrl = require('./mainCtrl'),
    fileArr = require('./fileArr'),
    corsOptions = {
        origin: config.redirect_URL
    };
require('./middleware/session');
require('./routes/get')(app);
require('./routes/post')(app);

fileArr.arr.map(file => {
    app.use(express.static(__dirname + file));
})

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})
