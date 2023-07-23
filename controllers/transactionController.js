const User = require("../models/UserModel");
const dotenv = require("dotenv")
dotenv.config()
const Web3 = require('web3');
const Transactions = require("../models/transictionModel");

const apikey = process.env.API_WALLET_KEY
const estimateGas = async (req, res) => {
    try {
        const { network, coin_name } = req.body
        const node = `https://${coin_name}.getblock.io/${apikey}/${network}`
        const web3 = new Web3(node)

        web3.eth.getGasPrice().then((result) => {
            const gasprice = web3.utils.fromWei(result, 'ether')
            res.send({ gasprice })
        })
    } catch (error) {
        res.status(500)
    }
}

const signedTx = async (req, res) => {
    try {
        const { to_address, privatekey, network, coin_name, coin_val } = req.body
        const id = req.user.id
        const node = `https://${coin_name}.getblock.io/${apikey}/${network}`
        const web3 = new Web3(node)
        const accountfrom = web3.eth.accounts.privateKeyToAccount(privatekey)

        const createsingtx = async (rawtx) => {
            rawtx.gas = await web3.eth.estimateGas(rawtx)
            return await accountfrom.signTransaction(rawtx)
        }

        const sendSignedtx = async (signedtx) => {
            const res_to_send = await web3.eth.sendSignedTransaction(signedtx.rawTransaction)
            return res_to_send
        }

        const rawtx = {
            to: to_address,
            value: web3.utils.toWei(coin_val, "ether")
        }

        const appendToDatabase = async (val) => {
            const exist_tx = await Transactions.findOne({ userId: id })
            if (exist_tx !== null) {
                update_txArray = await Transactions.findOneAndUpdate({ userId: id },
                    { $push: { transictiondetail: val } }
                )
                res.send({ success: true, transictionDetail: val })
                await update_txArray.save()
            }
            else {
                createTx = await Transactions.create({
                    transictiondetail: val,
                    userId: id
                })
                res.send({ success: true, transictiondetail: createTx })
                await createTx.save()
            }
        }

        createsingtx(rawtx).then(sendSignedtx).then(appendToDatabase)

    } catch (error) {
        res.status(500)
    }

}

const txhistory = async (req, res) => {
    try {
        const userId = req.user.id
        const txData = await Transactions.findOne({ userId: userId })

        if (txData) {
            res.send(txData)
        }
    } catch (error) {
        res.status(500)
    }
}

module.exports = { signedTx, txhistory, estimateGas }