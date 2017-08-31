const mainCtrl = require('../controllers/mainCtrl'),
    vimeoCtrl = require('../controllers/vimeoCtrl');

module.exports = app => {
    app.get('/api/videos', vimeoCtrl.getVideoById);
    app.get('/api/videos/:pageNum', vimeoCtrl.getVideos);
    app.get('/api/videos/channels/:channel', vimeoCtrl.getVideoByChannels);
    app.get('/api/videos/:id/comments', vimeoCtrl.getComments);
    app.get('/api/videos/channels/:channel', vimeoCtrl.getVideoByChannels);
    app.get('/api/login', mainCtrl.login);
    app.get('/api/callback', mainCtrl.callback);
    app.get('/api/logout', mainCtrl.logout);
    app.get('/api/accesstoken', mainCtrl.getAccessToken);
    app.get('/api/currentuser', mainCtrl.getUser);
    app.get('/api/usersvideos', mainCtrl.displayWatchLater);
    app.get('/api/usersvideos', mainCtrl.usersVideos);
}
