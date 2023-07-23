const express = require("express")
const app = express()
const connectDB = require("./config/dbconnection")
const { getTokensBalance } = require('@mycrypto/eth-scan')
const Web3 = require("web3")
const Moralias = require('moralis').default;
connectDB()

const port = 5000

app.use(express.json())
app.use("/api/users", require('./routes/userRoutes'))
app.use("/api/txt", require('./routes/transactionRoutes'))

app.listen(port, () => {
    console.log(`Server is live on http://localhost:${port}`)
})

const apikey = process.env.API_WALLET_KEY
const network = 'testnet'

const node = `https://matic.getblock.io/${apikey}/${network}`

const web3 = new Web3(node)

const address = "0x053CC036A5CD88b396C629517517e4e8a70b1B2E"
const token = "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b"

// web3.eth.estimateGas({
//     to: address,
//     value: web3.utils.toWei("0.01", "ether")
// }).then(console.log)
const accountfrom = web3.eth.accounts.privateKeyToAccount("0xcf5c3ccb51f824c66a82e6dcc6707c33640de3b284c7c935e7cb40b8cc5913d3")

const createsingtx = async (rawtx) => {
    rawtx.gas = await web3.eth.estimateGas(rawtx)
    const gas = await accountfrom.signTransaction(rawtx)
    console.log([gas])
}

// web3.eth.getGasPrice().then((result) => {
//     console.log(web3.utils.fromWei(result, 'ether'))
// })
const sendSignedtx = async (signedtx) => {
    web3.eth.sendSignedTransaction(signedtx.rawTransaction).then(console.log)
}

const rawtx = {
    to: address,
    value: web3.utils.toWei("0.1", "ether")
}

// createsingtx(rawtx)
const bal = async () => {
    const val = await web3.eth.getBalance(address)
    console.log(web3.utils.fromWei(val))
    // const pasttx = await web3.eth.getTransaction("0x436e8c8f3f99d66e6ee7bbf3ae2280eebe93e1662996a036fa96107304962f41").then(console.log)
}
// bal()
// Moralias.start({
//     apiKey: "TM4117zy383BE8heoyiaj5v9CzM3kwLUH9RZtcACAzBWvhw7BoX5GvXlN2zEEae0"
// }).then((data) => console.log(data))

// const balancefun = async () => {
//     const balance = await Moralias.EvmApi.balance.getNativeBalance({
//         address: address,
//         chain: "0x13881"
//     })
//     console.log(balance.raw)
// }
// balancefun()
