let user = JSON.parse(localStorage.getItem('login_success')) || false
import Swal from "sweetalert2";

if(!user){
    Swal.fire({
        icon: 'info',
        title: 'Iniciar sesión',
        text: 'Debes iniciar sesión para ingresar a esta página.',
        confirmButtonText: 'Ir al inicio de sesión',
        showCancelButton: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'login.html'
        }
    });
}

let logout = document.querySelector('#logout')
logout.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: 'Cerrar Sesión',
        text: '¿Estás seguro de que quieres cerrar la sesión?',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        confirmButtonColor: "#3a043a",
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('login_success');
            Swal.fire({
                icon: 'success',
                title: 'Sesión Cerrada',
                text: 'Sesión cerrada correctamente',
                confirmButtonText: 'Ok',
                confirmButtonColor: "#3a043a"
            }).then(() => {
                window.location.href = 'login.html'
            }); 
        }
    });
});
