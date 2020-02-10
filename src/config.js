const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || 'localhost'
const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost'
const MONGODB_PORT = process.env.MONGODB_PORT || 27017
const DB_NAME = process.env.DB_NAME || 'enterprise-control-2018336'
const MONGODB_URL = process.env.MONGODB_URL || `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${DB_NAME}`

module.exports = 
{

    PORT,
    HOST,
    MONGODB_PORT,
    DB_NAME,
    MONGODB_URL

}