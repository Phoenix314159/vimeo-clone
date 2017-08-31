module.exports = {
    port: process.env.PORT,
    MASSIVE_URI: process.env.MASSIVE_URI,
    SESSION_SECRET: process.env.SESSION_SECRET,
    stripeKey: process.env.STRIPE_KEY,
    redirect_uri: `https://vimeo-clone.herokuapp.com/api/callback`,
    redirect_URL: `https://vimeo-clone.herokuapp.com/`
}

