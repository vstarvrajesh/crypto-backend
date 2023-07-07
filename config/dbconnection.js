const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Databse connected " + connect.connection.host)
    } catch (error) {
        console.log(error + "There are errors")
    }
}

module.exports = connectDB;