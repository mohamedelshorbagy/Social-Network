const config = {
    port: process.env.PORT || 3000,
    database: 'mongodb://localhost:27017/social-network',
    secretKey: 'secret'
}


module.exports = config;