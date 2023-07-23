const express = require("express");
const authentication = require("../middlewere/authenticate");
const { signedTx, txhistory, estimateGas } = require("../controllers/transactionController");
const router = express.Router();

router.route("/transaction").post(authentication, signedTx)

router.route("/estimategas").post(estimateGas)

router.route("/txhistory").get(authentication, txhistory)

module.exports = router;