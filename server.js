const express = module.exports = require('express'),
    app = module.exports = express(),
    config = require('./config/config'),
    fileArr = require('./services/fileArr');

require('./services/middleware')(app);
require('./routes/get')(app);
require('./routes/post')(app);

// fileArr.files.map(file => {
//     app.use(express.static(__dirname + file));
// })

//<--------- production ----------->
process.env.PWD = process.cwd();

app.use('/', express.static(process.env.PWD + '/dist'));

fileArr.arr.filter(a => {
    if(a !== fileArr.arr[0]){
        return true;
    }
}).map(file => {
    app.use(express.static(process.env.PWD + file));
})
//<--------- production ----------->

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})
