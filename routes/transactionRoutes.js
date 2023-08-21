const express = require("express");
const authentication = require("../middlewere/authenticate");
const { signedTx, txhistory, estimateGas, getUserBal } = require("../controllers/transactionController");
const router = express.Router();

router.route("/transaction").post(authentication, signedTx)

router.route("/estimategas").post(estimateGas)

router.route("/txhistory").get(authentication, txhistory)

router.route("/getuserbalance").get(authentication, getUserBal)

module.exports = router;