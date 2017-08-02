const vimeo_module = require('./lib/vimeo'),
    Vimeo = vimeo_module.Vimeo,
    config = require('./config'),
    axios = require('axios'),
    lib = new Vimeo(config.CLIENT_ID, config.CLIENT_SECRET, config.access_token),
    redirect_url = config.redirect_URL;

module.exports = {
    getVideos: (req, res) => {
        let makeRequest = lib => {
            return lib.request({
                path: `/videos?filter=content_rating&filter_content_rating=safe,unrated`,
                query: {
                    page: req.params.pageNum,
                    per_page: 12,
                    query: `${req.query.search}`,
                    sort: 'relevant',
                    direction: 'asc'
                },
            }, (error, body) => {
                return !error ? res.status(200).send(body) : console.log(error);
            })
        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            lib.generateClientCredentials('public', (err, access_token) => {
                if (err) {
                    res.status(404).send(err);
                }
                lib.access_token = access_token.access_token;
                makeRequest(lib);
            });
        }
    },
    getComments: (req, res) => {
        let makeRequest = lib => {
            return lib.request({
                path: `/videos/${req.params.id}/comments`,
                query: {
                    per_page: 10,
                    direction: 'desc'
                }
            }, (error, body) => {
                return !error ? res.status(200).send(body) : console.log(error);
            })
        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            lib.generateClientCredentials('public', (err, access_token) => {
                if (err) {
                    res.status(404).send(err);
                }
                lib.access_token = access_token.access_token;
                makeRequest(lib);
            });
        }
    },
    getVideoById: (req, res) => {
        let makeRequest = lib => {
            return lib.request({
                path: `/videos/${req.query.id}`,
                query: {
                    per_page: 10
                }
            }, (error, body) => {
                return !error ? res.status(200).send(body) : console.log(error);
            })
        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            lib.generateClientCredentials('public', (err, access_token) => {
                if (err) {
                    res.status(404).send(err);
                }
                lib.access_token = access_token.access_token;
                makeRequest(lib);
            });
        }
    },
    getVideoByChannels: (req, res) => {
        let makeRequest = lib => {
            return lib.request({
                path: `/channels/${req.params.channel}/videos`,
                query: {
                    per_page: 10
                }
            }, (error, body) => {
                return !error ? res.status(200).send(body) : console.log(error);
            })
        }
        if (config.access_token) {
            lib.access_token = config.access_token;
            makeRequest(lib);
        }
        else {
            lib.generateClientCredentials('public', (err, access_token) => {
                if (err) {
                    res.status(404).send(err);
                }
                lib.access_token = access_token.access_token;
                makeRequest(lib);
            });
        }
    },
    uploadVid: (req, res) => {
        axios({
            method: 'post',
            headers: {Authorization: `Bearer ${req.session.access_token}`},
            url: 'https://api.vimeo.com/me/videos',
            data: {
                type: 'pull',
                link: req.body.video
            }
        }).then(resp => {
            res.status(201).send('hi');
            console.log(resp);
        })
    }
}
