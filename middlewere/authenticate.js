const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const authentication = async (req, res, next) => {
    const token = req.header("token")
    const userdata = jwt.verify(token, process.env.SEC_KEY)
    const verifyuser = await User.findOne({ _id: userdata.user.id })

    if (verifyuser) {
        req.user = userdata.user
        next()
    }
    else {
        res.status(400).json("Please validate using a token")
    }
}

module.exports = authentication