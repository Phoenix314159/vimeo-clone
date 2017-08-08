const express = module.exports = require('express'),
    app = module.exports = express(),
    config = require('./config'),
    vimeoCtrl = require('./vimeoCtrl'),
    mainCtrl = require('./mainCtrl'),
    fileArr = require('./fileArr');

require('./middleware')(app);
require('./routes/get')(app);
require('./routes/post')(app);

fileArr.arr.map(file => {
    app.use(express.static(__dirname + file));
})

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})
