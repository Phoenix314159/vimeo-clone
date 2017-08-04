const mainCtrl = require('../mainCtrl'),
    vimeoCtrl = require('../vimeoCtrl');

module.exports = app => {
    app.post('/api/videos/:id/comments', mainCtrl.addComments);
    app.post('/api/uploadvideo', vimeoCtrl.uploadVid);
    app.post('/api/videos/:id/watchlater', mainCtrl.watchLater);
}
