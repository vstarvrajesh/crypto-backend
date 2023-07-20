const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const authentication = async (req, res, next) => {
    try {
        const token = req.header("token")
        let userdata = jwt.verify(token, process.env.SEC_KEY)
        if (userdata) {
            req.user = userdata.user
            next()
        } else {
            res.status(400).json("Please enter a valid token")
        }
    } catch (error) {
        res.status(400).json(error)
    }

}

module.exports = authentication