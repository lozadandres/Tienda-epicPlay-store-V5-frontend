let loginForm = document.querySelector('#loginForm')
import Swal from "sweetalert2";

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value

    let Users = JSON.parse(localStorage.getItem('users')) || []
    let validUser = Users.find(user => user.email === email && user.password === password)

    if(!validUser){
        Swal.fire({
            icon: 'error',
            title: 'Error de Datos',
            text: 'El usuario y/o contraseña son incorrectos',
            confirmButtonColor: "#3a043a"
        })
        return
    }
    Swal.fire({
        icon: 'success',
        title: 'Inicio de Sesión Exitoso',
        text: `Bienvenido ${validUser.name}`,
        confirmButtonColor: "#3a043a"
    }).then(() => {
        // Guarda en localStorage que el usuario ha iniciado sesión correctamente
        localStorage.setItem('login_success', JSON.stringify(validUser));

        // Redirige al usuario al home (página principal)
        window.location.href = 'index.html'
    });
})