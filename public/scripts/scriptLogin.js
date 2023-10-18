const usuario = document.querySelector("#usuario")
const senha = document.querySelector("#senha")
const btn_entrar = document.querySelector("#btn_entrar")
const msg_server = document.querySelector("#msg_server")

btn_entrar.addEventListener("click", async (evt) => {
    evt.preventDefault()

    try {
        if (usuario.value === "" || senha.value === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos os campos devem ser prenchidos!',
            })
            return;
        }

        const responseLogin = await axios.post("http://localhost:3000/login", {
            username: usuario.value,
            password: senha.value
        })

        if (responseLogin.data.success) {
            Swal.fire(
                `${responseLogin.data.message}!`,
                '',
                'success'
            )
        }
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}!`,
        })
    }
})