require("./connectDataBase").connectDataBase()
const mongoose = require("mongoose")

const UserModelLogin = new mongoose.Schema({
    username: String,
    password: String,
    confirm_password: String,
    tentativas: { type: Number, default: 5 },
    block_login: Date
})

const ModelLogin = mongoose.connection.useDb("login-block").model("login", UserModelLogin)

module.exports = ModelLogin