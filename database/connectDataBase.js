require("dotenv").config()
const mongoose = require("mongoose")

async function connectDataBase() {
    mongoose.connect(`mongodb+srv://${process.env.USERNAME_DATA_BASE}:${process.env.PASSWORD}@bancodedadosvitor-vx.6awlvqi.mongodb.net/?retryWrites=true&w=majority`).catch(err => {
        console.log(err);
    })
}

module.exports = { connectDataBase }