const {login, callback, logout, getAccessToken, getUser,
    displayWatchLater, usersVideos} = require('../controllers/mainCtrl'),
  {getVideoById, getVideos, getVideoByChannels,
    getComments, getVideoByChannels} = require('../controllers/vimeoCtrl');

module.exports = app => {
    app.get('/api/videos', getVideoById);
    app.get('/api/videos/:pageNum', getVideos);
    app.get('/api/videos/channels/:channel', getVideoByChannels);
    app.get('/api/videos/:id/comments', getComments);
    app.get('/api/videos/channels/:channel', getVideoByChannels);
    app.get('/api/login', login);
    app.get('/api/callback', callback);
    app.get('/api/logout', logout);
    app.get('/api/accesstoken', getAccessToken);
    app.get('/api/currentuser', getUser);
    app.get('/api/usersvideos', displayWatchLater);
    app.get('/api/usersvideos', usersVideos);
}
