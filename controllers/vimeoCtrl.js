const vimeo_module = require('../lib/vimeo'),
  Vimeo = vimeo_module.Vimeo,
  {CLIENT_ID, CLIENT_SECRET, access_token, redirect_URL} = require('../config/config'),
  axios = require('axios'),
  lib = new Vimeo(CLIENT_ID, CLIENT_SECRET, access_token),
  redirect_url = redirect_URL

module.exports = {
  getVideos: (req, res) => {
    const {params: {pageNum}, query: {search}} = req
    const makeRequest = lib => {
      return lib.request({
        path: `/videos?filter=content_rating&filter_content_rating=safe,unrated`,
        query: {
          page: pageNum,
          per_page: 12,
          query: `${search}`,
          sort: 'relevant',
          direction: 'asc'
        },
      }, (error, body) => {
        console.log('body: ', body)
        return !error ? res.status(200).send(body) : console.log(error)
      })
    }
    if (access_token) {
      lib.access_token = access_token
      makeRequest(lib)
    }
    else {
      lib.generateClientCredentials('public', (err, access_token) => {
        if (err) {
          res.status(404).send(err)
        }
        lib.access_token = access_token.access_token
        makeRequest(lib)
      })
    }
  },
  getComments: (req, res) => {
    const {params: {id}} = req
    let makeRequest = lib => {
      return lib.request({
        path: `/videos/${id}/comments`,
        query: {
          per_page: 10,
          direction: 'desc'
        }
      }, (error, body) => {
        return !error ? res.status(200).send(body) : console.log(error)
      })
    }
    if (access_token) {
      lib.access_token = access_token
      makeRequest(lib)
    }
    else {
      lib.generateClientCredentials('public', (err, access_token) => {
        if (err) {
          res.status(404).send(err)
        }
        lib.access_token = access_token.access_token
        makeRequest(lib)
      })
    }
  },
  getVideoById: (req, res) => {
    const {query: {id}} = req
    const makeRequest = lib => {
      return lib.request({
        path: `/videos/${id}`,
        query: {
          per_page: 10
        }
      }, (error, body) => {
        return !error ? res.status(200).send(body) : console.log(error)
      })
    }
    if (access_token) {
      lib.access_token = access_token
      makeRequest(lib)
    }
    else {
      lib.generateClientCredentials('public', (err, access_token) => {
        if (err) {
          res.status(404).send(err)
        }
        lib.access_token = access_token.access_token
        makeRequest(lib)
      })
    }
  },
  getVideoByChannels: (req, res) => {
    const {params: {channel}} = req
    const makeRequest = lib => {
      return lib.request({
        path: `/channels/${channel}/videos`,
        query: {
          per_page: 10
        }
      }, (error, body) => {
        return !error ? res.status(200).send(body) : console.log(error)
      })
    }
    if (access_token) {
      lib.access_token = access_token
      makeRequest(lib)
    }
    else {
      lib.generateClientCredentials('public', (err, access_token) => {
        if (err) {
          res.status(404).send(err)
        }
        lib.access_token = access_token.access_token
        makeRequest(lib)
      })
    }
  },
  uploadVid: (req, res) => {
    const {session: {access_token}, body: {video}} = req
    axios({
      method: 'post',
      headers: {Authorization: `Bearer ${access_token}`},
      url: 'https://api.vimeo.com/me/videos',
      data: {
        type: 'pull',
        link: video
      }
    }).then(resp => {
      res.status(201).send('some text')
    })
  }
}
