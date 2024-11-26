const mongoose = require('mongoose')
const {logger} = require('../logger')
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        logger.debug("Connect MongoDB success!")

    } catch (error) {
        logger.error("Connect MongoDB fail! " + error)
    }
}

module.exports = connectMongoDB