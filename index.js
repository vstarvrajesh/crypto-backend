const express = require("express")
const app = express()
const connectDB = require("./config/dbconnection")
const { body } = require("express-validator")
connectDB()

const port = 5000

app.use(express.json())
app.use("/api/users", require('./routes/userRoutes'))

app.listen(port, () => {
    console.log(`Server is live on http://localhost:${port}`)
})