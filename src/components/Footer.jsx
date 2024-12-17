import img13 from '../assets/img/LogoGamerIlustra.png';
import img14 from '../assets/img/Medios-de-pago-GTech-Systems-Addi-MercadoPago-Bancolombia-Davivienda-Nequi.webp';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img src={img13} alt="logo"/>
              <h3>EpicPlay Store</h3>
            </a>
            <p className="footer-text">
              Nuestra pasión por los videojuegos nos llevó a crear un espacio
              seguro y confortable para la comunidad Gamer. Creemos en el poder
              de los videojuegos para unir personas y te ofrecemos una experiencia
              de compra excepcional, comprometidos con tu satisfacción y crecimiento.
              ¡Vamos al siguiente nivel!
            </p>
          </div>

          <ul className="footer-list">
            <li>
              <h3 className="footer-list-title">Enlaces</h3>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <a href="#" className="footer-link">
                FAQs
              </a>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <a href="#nosotros" className="footer-link">
                Nosotros
              </a>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <a href="#" className="footer-link">
                Política de privacidad
              </a>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <a href="#" className="footer-link">
                Términos y condiciones
              </a>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <h3 className="footer-list-title">Contacto</h3>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <a href="#" className="footer-link">
                <i className="bx bxs-map-alt"></i> Calle
              </a>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <a href="#" className="footer-link">
                <i className="bx bxs-contact"></i> +57 111 111-1111
              </a>
            </li>
            <li style={{ marginBottom: '20px' }}>
              <a href="#" className="footer-link">
                <i className="bx bxs-envelope"></i> storepicplay@gmail.com
              </a>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <h3 className="footer-list-title">Horario de apertura</h3>
            </li>
            <li>
              <p className="footer-link" style={{ marginBottom: '20px' }}>
                Lunes - viernes:
              </p>
            </li>
            <li>
              <p className="footer-link" style={{ marginBottom: '20px' }}>
                Sábado - Domingo
              </p>
            </li>
            <li>
              <p className="footer-link" style={{ marginBottom: '20px' }}>
                8:00Am - 6:00Pm
              </p>
            </li>
            <li>
              <p className="footer-link" style={{ marginBottom: '20px' }}>
                8:00Am - 12:00Pm
              </p>
            </li>
            <img src={img14} alt="Medios de pago" />
          </ul>
        </div>

        <div className="footer-bottom">
          <ul className="social-list">
            <li>
              <a href="#" className="social-link">
                <i className="ri-facebook-box-line"></i>
              </a>
            </li>
            <li>
              <a href="#" className="social-link">
                <i className="ri-instagram-line"></i>
              </a>
            </li>
            <li>
              <a href="#" className="social-link">
                <i className="ri-twitter-x-line"></i>
              </a>
            </li>
          </ul>

          <p className="copyright">
            Todos los derechos reservados &copy; 2024 EpicPlay Store | sitio web creado por <a href="#"> Grupo 7</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

