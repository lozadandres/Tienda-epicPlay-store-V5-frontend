import { useState } from 'react';
import Swal from 'sweetalert2';

const SignupEndUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [superUserCode, setSuperUserCode] = useState('');
  
  // Defino el código de super usuario
  const SUPER_USER_CODE = 'ADMIN123';

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserRegistered = users.find(user => user.email === email);

    if (isUserRegistered) {
      Swal.fire({
        icon: 'error',
        title: 'Error de datos',
        text: 'El correo ya se encuentra en uso, usa otro diferente',
        confirmButtonColor: "#3a043a",
        background: '#fff',
        color: '#000'
      });
      return;
    }

    const isSuperUser = superUserCode === SUPER_USER_CODE;
    
    const newUser = {
      name,
      email,
      password,
      isSuperUser
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    if (isSuperUser) {
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Se ha registrado como super usuario',
        confirmButtonColor: "#3a043a",
        background: '#fff',
        color: '#000'
      }).then(() => {
        window.location.href = '/login';
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Tu registro se ha realizado con éxito',
        confirmButtonColor: "#3a043a",
        background: '#fff',
        color: '#000'
      }).then(() => {
        window.location.href = '/login';
      });
    }
  };

  return (
    <section className='logingSection'>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <label>Código de Super Usuario (opcional)</label>
        <input
          type="password"
          value={superUserCode}
          onChange={(e) => setSuperUserCode(e.target.value)}
          placeholder="Dejar vacío para usuario normal"
        />
        <input type="submit" value="Registro" />
      </form>
      <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
    </section>
  );
};

export default SignupEndUser;
