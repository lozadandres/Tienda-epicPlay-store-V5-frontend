import { useState } from 'react';
import Swal from 'sweetalert2';
import '../assets/loginCSS/css/styles.css';

const LoginEndUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (!validUser) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Datos',
        text: 'El usuario y/o contraseña son incorrectos',
        confirmButtonColor: "#3a043a",
        background: '#fff',
        color: '#000'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Inicio de Sesión Exitoso',
      text: `Bienvenido ${validUser.name}`,
      confirmButtonColor: "#3a043a",
      background: '#fff',
      color: '#000'
    }).then(() => {
      localStorage.setItem('login_success', JSON.stringify(validUser));
      // Redirección basada en el tipo de usuario
      if (validUser.isSuperUser) {
        window.location.href = '/Dashboard';
      } else {
        window.location.href = '/';
      }
    });
  };

  return (
    <section className='logingSection'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Ingresar" />
      </form>
      <p>¿No tienes una cuenta? <a href="/signup">Regístrate</a></p>
    </section>
  );
};

export default LoginEndUser;
