require("dotenv").config()

const db = require("../database/models")

const express = require("express")
const app = express()

const porta = process.env.PORTA
const path = require("path")
const { time_LoginBlock_verific } = require("./utils/functions")

// Date
const time_Block_Login = new Date()

app.use(express.json())
app.use(express.static("public"))

app.get("/login", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../public/html/login.html"))
        return;
    } catch (err) {
        console.log(err)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const cliente = await db.findOne({ username });
        if (!cliente) {
            res.status(400).json({ message: "Usúario ou senha incorretos", success: false });
            return;
        }

        if (cliente.tentativas === 0) {
            if (!cliente.block_login) {
                cliente.block_login = time_Block_Login.setSeconds(20)
                await cliente.save();
            } else {
                const timeBlockLogin = cliente.block_login
                if (time_LoginBlock_verific(timeBlockLogin, 20)) {
                    cliente.block_login = null
                    cliente.tentativas = 5
                    await cliente.save();
                }
            }
            res.status(400).json({ message: "Conta bloqueada. Tente novamente mais tarde.", success: false });
            return;
        }

        if (cliente.password !== password && cliente.tentativas !== 0) {
            cliente.tentativas--;
            await cliente.save();
            res.status(400).json({ message: "Usúario ou senha incorretos", success: false });
            return;
        }

        res.status(200).json({ message: "Login efetuado", success: true });
    } catch (err) {
        res.status(500).json({ message: "Erro internal server." });
    }
});

app.get("/registre", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../public/html/registro.html"))
        return;
    } catch (err) {
        console.log(err)
    }
})

app.post("/registre", async (req, res) => {
    try {
        const { username, password, confirm_password } = req.body

        if (!username || !password || !confirm_password) {
            res.status(422).json({ message: "Todos os campos devem ser preenchidos.", success: false })
            return;
        }

        const verificClientExiste = await db.findOne({ username })
        if (verificClientExiste) {
            res.status(400).json({ message: "Usúario já existe. Faça outro.", success: false })
            return;
        }

        const createClient = await db.create({
            username,
            password,
            confirm_password
        })

        if (createClient) {
            res.status(200).json({ message: "Usúario criado!", success: true })
            return;
        } else {
            res.status(200).json({ message: "Erro ao criar o usúario.", success: false })
            return;
        }
    } catch (err) {
        res.status(500).json({ message: "Erro internal server." })
    }
})

app.use((req, res, next) => {
    res.redirect("/login")
    return;
})

app.listen(porta, () => console.log(`Servidor iniciado na porta: ${porta}`))