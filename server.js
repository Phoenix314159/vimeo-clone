const express = module.exports = require('express'),
    app = module.exports = express(),
    config = require('./config'),
    fileArr = require('./fileArr');

require('./middleware')(app);
require('./routes/get')(app);
require('./routes/post')(app);

fileArr.files.map(file => {
    app.use(express.static(__dirname + file));
})

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})
