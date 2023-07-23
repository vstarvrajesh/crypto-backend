const mongoose = require("mongoose");
const { Schema } = mongoose

const transictionModel = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        transictiondetail: {
            type: Array
        }
    },
    {
        timestamps: true
    }
)

const Transactions = mongoose.model("Transactions", transictionModel);
module.exports = Transactions