import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoPrincipal from '../assets/img/LogoGamerIlustra.png';
import Swal from 'sweetalert2';

const NavBar = () => {
  const navigate = useNavigate(); // Hook para redirigir a otras rutas
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginData = localStorage.getItem('login_success');
      if (loginData) {
        const userData = JSON.parse(loginData);
        setIsLoggedIn(true);
        setUserName(userData.name);
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    checkLoginStatus();
    // Agregamos un event listener para detectar cambios en el localStorage
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);
  const handleLogout = () => {
    Swal.fire({
      icon: 'info',
      title: 'Cerrar Sesión',
      text: '¿Estás seguro de que quieres cerrar la sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      confirmButtonColor: "#3a043a",
      cancelButtonText: 'Cancelar',
      background: '#fff',
      color: '#000'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('login_success'); // Eliminar datos del usuario logueado
        setIsLoggedIn(false);
        setUserName('');
        Swal.fire({
          icon: 'success',
          title: 'Sesión Cerrada',
          text: 'Sesión cerrada correctamente',
          confirmButtonColor: "#3a043a",
          background: '#fff',
          color: '#000'
        }).then(() => {
          navigate('/'); // Redirigir al login
        });
      }
    });
  };

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          <img src={logoPrincipal} alt="logo" />
        </Link>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item"><Link to="/" className="nav__link">Inicio</Link></li>
            <li className="nav__item"><Link to="/Products" className="nav__link">Productos</Link></li>
            <li className="nav__item"><Link to="/contact" className="nav__link">Contacto</Link></li>
          </ul>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="search-box" id="search-box">
            <div className="glyphicon glyphicon-search search-icon">
              <i className="ri-shopping-cart-fill"></i>
            </div>       
          </div>
          {isLoggedIn ? (
            <div className="search-box" id="search-box">
              <div className="glyphicon glyphicon-search search-icon">
                <button id="logout" onClick={handleLogout}>
                  <i className="ri-user-6-fill"></i> {userName} (Logout)
                </button>
              </div>
            </div>
          ) : (
            <div className="search-box" id="search-box">
              <div className="glyphicon glyphicon-search search-icon">
                <Link to="/login">
                  <button id="logout">
                    <i className="ri-user-6-fill"></i> Login
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;



