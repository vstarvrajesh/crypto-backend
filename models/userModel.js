const mongoose = require("mongoose");
const { Schema } = mongoose

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add the user name"],
        },
        email: {
            type: String,
            required: [true, "Please add the user email address"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please add the user password"],
        },
        primarywallet: {
            type: Object,
            required: true
        },
        otherwallet: {
            type: Array
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User

// module.exports = mongoose.model("User", userSchema);