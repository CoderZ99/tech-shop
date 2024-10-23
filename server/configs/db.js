const mongoose = require('mongoose')

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("Connect MongoDB success!")

    } catch (error) {
        console.log("Connect MongoDB fail! " + error)
    }
}

module.exports = connectMongoDB