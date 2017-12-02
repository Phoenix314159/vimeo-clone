"use strict";
const vimeo_module = require('../lib/vimeo'),
    app = require('../server'),
    config = require('../config/config'),
    massive = require('massive'),
    connString = config.MASSIVE_URI,
    massiveInstance = massive.connectSync({connectionString: connString}),
    base64 = require('base-64').encode,
    axios = require('axios'),
    Vimeo = vimeo_module.Vimeo,
    state = 'test',
    redirect_uri = config.redirect_uri,
    redirectUrl = config.redirect_URL,
    lib = new Vimeo(config.CLIENT_ID, config.CLIENT_SECRET),
    scopes = ['public', 'private', 'purchased', 'create', 'edit', 'delete', 'interact', 'upload'],
    url = lib.buildAuthorizationEndpoint(redirect_uri, scopes, state);

app.set('db', massiveInstance);
let db = app.get('db');

module.exports = {

    login: (req, res) => {
        res.send(url);
    },
    callback: (req, res) => {
        axios({
            method: 'post',
            url: 'https://api.vimeo.com/oauth/access_token',
            data: {
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: redirect_uri
            },
            headers: {Authorization: "basic " + base64(config.CLIENT_ID + ":" + config.CLIENT_SECRET)}
        }).then(response => {
            req.session.user = response.data.user;
            let usersName = req.session.user.name;
            db.delete_all_users((err, result) => {
            });
            db.add_user([usersName], (err, result) => {
            })
            req.session.access_token = response.data.access_token;
            res.redirect(redirectUrl);
        }).catch(error => {
            console.log(error);
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.send(true);
    },
    getUser: (req, res) => {
        axios({
            method: 'get',
            headers: {Authorization: `Bearer ${req.session.access_token}`},
            url: 'https://api.vimeo.com/me?fields=uri,name'
        }).then(response => {
            res.status(200).json(req.session.user);
        }).catch(error => {
            res.status(401).send('Not signed in')
            console.log(error);
        });
    },
    getAccessToken: (req, res) => {
        axios({
            method: 'get',
            headers: {Authorization: `Bearer ${req.session.access_token}`},
            url: 'https://api.vimeo.com/me'
        }).then(response => {
            res.status(200).json(req.session);
        }).catch(error => {
            console.log(error);
        });
    },
    uploadVideo: (req, res) => {
        const {body: {video}, session: {access_token}} = req
        db.add_video([video], (err, result) => {
            !err ? res.status(200).send(result) : res.status(404).send(err);
        })
        axios({
            method: 'post',
            headers: {Authorization: `Bearer ${access_token}`},
            url: 'https://api.vimeo.com/me/videos',
            data: {
                type: 'pull',
                link: video
            }
        }).then(resp => {
            res.status(200).send('uploaded');
        });
    },
    usersVideos: (req, response) => {
        const {session: {access_token}} = req
        axios({
            method: 'get',
            url: 'https://api.vimeo.com/me/videos',
            headers: {Authorization: `Bearer ${access_token}`}
        }).then(res => {
            response.status(200).send(res.data);
        }).catch(error => {
            console.log(error);
        });
    },
    addComments: (req, res) => {
        const {body: {text}, params: {id}, session: {access_token}} = req
        axios({
            method: 'post',
            url: `https://api.vimeo.com/videos/${id}/comments`,
            headers: {Authorization: `Bearer ${access_token}`},
            data: {
                text,
                scope: scopes
            }
        }).then(resp => {
            res.status(201).send('info');
        }).catch(error => {
            console.log('ERROR', error);
        });

    },
    watchLater: (req, res) => {
        const {body: {video}, params: {id}} = req
        db.add_video([video, id], (err, video) => {
            !err ? res.status(200).send(video) : res.status(404).send(err);
        })
    },
    displayWatchLater: (req, res) => {
        db.get_videos((err, video) => {
            !err ? res.status(200).send(video) : res.status(404).send(err);
        })
    }
}
