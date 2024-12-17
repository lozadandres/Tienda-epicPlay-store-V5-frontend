import { useEffect } from 'react';
import imgEnvío from '../assets/img/envio.png';
import imgPago from '../assets/img/pago.png';
import imgDevoluciones from '../assets/img/devoluciones.png';
import imgSoporte from '../assets/img/soporte.png';

const Contact = () => {
  useEffect(() => {
    document.title = 'Pagina de Contacto';
  }, []);
  return (
    <section className="container section section__height" id="contacto">
      <h2 className="section__title">Contacto</h2>
      <img src="../src/assets/img/character-1.png" alt="Game character" className="character character-1" />

      <form action="https://formspree.io/f/xzzpnyek" method="POST">
        <div className="contecont" style={{ display: "grid" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "20px" }}>
            <input type="text" name="nombre" placeholder="Ingrese su nombre" required />
            <input
              type="email"
              name="correo"
              placeholder="Ingrese su email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Ingrese un correo válido"
              style={{
                clipPath: "polygon(0% 0%, 90% 0, 100% 30%, 100% 100%, 0 100%)",
              }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "20px" }}>
            <input
              type="tel"
              name="telefono"
              placeholder="Ingrese su telefono"
              pattern="[0-9]{10}"
              title="Ingrese un número de teléfono válido (10 dígitos)"
            />
            <input type="text" name="asunto" placeholder="Ingrese su asunto" />
          </div>
          <textarea name="mensaje" placeholder="Ingrese su mensaje" required></textarea>
          <input type="submit" value="ENVIAR" className="btn" />
        </div>
      </form>

      <section className="container section section__height" id="FAQs">

        <h2 className="section__title">FAQs</h2>

        <ul className="service-list">

            <li className="service-item">
              <div className="service-card">

                <div className="card-icon">
                  <img src={imgEnvío} alt="" />
                </div>

                <div>
                  <h3 className="h4 card-title">Envío gratuito</h3>

                  <p className="card-text">
                    
                  </p>
                </div>

              </div>
            </li>

            <li className="service-item">
              <div className="service-card">

                <div className="card-icon">
                  <img src={imgPago} alt="" />
                </div>

                <div>
                  <h3 className="h4 card-title">Pago rápido</h3>

                  <p className="card-text">
                    
                  </p>
                </div>

              </div>
            </li>

            <li className="service-item">
              <div className="service-card">

                <div className="card-icon">
                  <img src={imgDevoluciones} alt="" />
                </div>

                <div>
                  <h3 className="h4 card-title">Devoluciones gratuitas</h3>

                  <p className="card-text">
                    
                  </p>
                </div>

              </div>
            </li>

            <li className="service-item">
              <div className="service-card">

                <div className="card-icon">
                  <img src={imgSoporte} alt="" />
                </div>

                <div>
                  <h3 className="h4 card-title">Soporte 24/7</h3>

                  <p className="card-text">
                  
                  </p>
                </div>

              </div>
            </li>
            <img src="../src/assets/img/ke6zz6jd.png" width="500px"></img>
          </ul>

      </section>       

    </section>
  );
};

export default Contact;

