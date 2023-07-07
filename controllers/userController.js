const { validationResult } = require("express-validator");
const User = require("../models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
const Web3 = require('web3')

const registerUser = async (req, res) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const { username, email, password } = req.body

            let user = await User.findOne({ email: email })
            if (user) {
                res.status(400).json("User already exist")
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(password, salt)

                const apikey = process.env.API_WALLET_KEY
                const network = 'goreli'

                const node = `https://eth.getblock.io/${apikey}/${network}`

                const web3 = new Web3(node)
                const primarywallet = await web3.eth.accounts.create()

                user = await User.create({
                    username: username,
                    password: secPass,
                    email: email,
                    primarywallet: primarywallet
                })
                await user.save()
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, process.env.SEC_KEY)
                res.json({ user, token, success: true })
            }
        }
        else {
            res.status(400).json({ error: result.array() })
        }
    } catch (error) {
        res.status(500).send("How is it")
    }
}

const loginUser = async (req, res) => {
    console.log(req.body)
    try {
        const result = validationResult(req);
        console.log(result.array())
        if (result.isEmpty()) {
            const { email, password } = req.body
            const user = await User.findOne({ email: email })
            console.log(user)
            console.log(user.username)
            const passwordcompare = await bcrypt.compare(password, user.password)
            if (user === null) {
                return res.status(400).json({ error: 'please enter correct email or password' })
            }
            if (!passwordcompare) {
                return res.status(400).json({ error: 'please enter correct email or password' })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.SEC_KEY)
            res.send({ token, user, success: true })
        } else {
            res.status(400).json({ error: result.array() })
        }
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}

const otherwallets = async (req, res) => {
    const id = req.user.id
    console.log(id)
    const apikey = process.env.API_WALLET_KEY
    const network = process.env.NETWORK

    const node = `https://eth.getblock.io/${apikey}/${network}`

    const web3 = new Web3(node)
    const otherwallet = await web3.eth.accounts.create()

    const userwallet = await User.findOne({ _id: id })

    if (userwallet.otherwallet) {
        const user = await User.findOneAndUpdate({ _id: id }, {
            $push: { otherwallet: otherwallet }
        })

        res.send({ user, success: true })
    }
    else {
        userwallet.updateOne({
            otherwallet: otherwallet
        })
    }

}

module.exports = { registerUser, loginUser, otherwallets }