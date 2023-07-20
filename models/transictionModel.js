const mongoose = require("mongoose");
const { Schema } = mongoose

const transictionModel = new mongoose.model(
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
        timestamps: true,
    }
)

const Transactions = mongoose.model("Transactions", transictionModel);
module.exports = Transactions