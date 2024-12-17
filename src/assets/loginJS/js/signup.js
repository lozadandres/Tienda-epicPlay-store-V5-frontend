// Llamaremos el id del formulario del registro
let signupForm = document.querySelector("#signupForm");
import Swal from "sweetalert2";

signupForm.addEventListener('submit' , (e) => {
    // Les ayuda a prevenir que la página se recargue de manera automática 
    e.preventDefault()

    // Obtener los valores del formulario
    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value

    // Los datos se almacenarán en la tabla users del bdd local , si no hay una tabla creada , me creará un arreglo vacío
    let Users = JSON.parse(localStorage.getItem('users')) || []
    // Buscamos en la bdd si el correo que se esta registrando ya se encuentra activo
    let isUserRegistered = Users.find(user => user.email === email)

    // Si el correo ya existe, que muestre que ya se encuentra en uso
    if(isUserRegistered) {
        Swal.fire({
            icon: 'error',
            title: 'Error de datos',
            text: 'El correo ya se encuentra en uso, usa otro diferente',
            confirmButtonColor: "#3a043a"
        })
        return
    }
    // Almacenaremos los datos del usuario 
    Users.push({name, email, password})
    // Convertimos los datos del nuevo usuario de string a objetos
    localStorage.setItem('users' , JSON.stringify(Users))
    // Mostrar el mensaje de registro exitoso
    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Tu registro se ha realizado con éxito',
        confirmButtonColor: "#3a043a"
    }).then(() => {
        window.location.href = 'login.html'
    })
})