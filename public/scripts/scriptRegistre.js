const usuario = document.querySelector("#usuario")
const senha = document.querySelector("#senha")
const confirm_senha = document.querySelector("#confirm_senha")
const btn_registrar = document.querySelector("#btn_registrar")
const msg_server = document.querySelector("#msg_server")

btn_registrar.addEventListener("click", async (evt) => {
    evt.preventDefault()

    try {
        const responseRegistre = await axios.post("http://localhost:3000/registre", {
            username: usuario.value,
            password: senha.value,
            confirm_password: confirm_senha.value
        })

        msg_server.textContent = responseRegistre.data.message
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
        })
    }
})