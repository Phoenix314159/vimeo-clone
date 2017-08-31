module.exports = {
    port: process.env.PORT,
    MASSIVE_URI: process.env.MASSIVE_URI,
    SESSION_SECRET: process.env.SESSION_SECRET,
    secretKey: process.env.SECRET_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    access_token: process.env.access_token,
    redirect_uri: `https://vimeo-clone.herokuapp.com/api/callback`,
    redirect_URL: `https://vimeo-clone.herokuapp.com/`
}

