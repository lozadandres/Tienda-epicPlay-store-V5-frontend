// src/Sponsors.jsx
import img1 from '../assets/img/amd-logo-300x300.png';
import img2 from '../assets/img/NVIDIA-150x54.png';
import img3 from '../assets/img/Diseno-sin-titulo-21-300x300.png';
import img4 from '../assets/img/razer1-225x225.png';
import img5 from '../assets/img/gigabyte-1.webp';
import img6 from '../assets/img/Diseno-sin-titulo-23-300x300.png';
import img7 from '../assets/img/logitech-1.png';
import img8 from '../assets/img/Group-1.png';
import img9 from '../assets/img/ASRock_logo.webp';
import img10 from '../assets/img/hp-transparent-hp-free-free-png.webp';
import img11 from '../assets/img/AsusNuevo-225x225.png';
import img12 from '../assets/img/logo-acer-300x300.png';


const Sponsors = () => {
  return (
    <div className="slider">
          <div className="slide-track">
              <div className="slide"><img src={img1} alt="img1" /></div>
              <div className="slide"><img src={img2} style={{ marginBlock: '60px' }} alt="" /></div>
              <div className="slide"><img src={img3} alt="" /></div>
              <div className="slide"><img src={img4} alt="" /></div>
              <div className="slide"><img src={img5} alt="" /></div>
              <div className="slide"><img src={img6} alt="" /></div>
              <div className="slide"><img src={img7} alt="" /></div>
              <div className="slide"><img src={img8} alt="" /></div>
              <div className="slide"><img src={img9} style={{ marginBlock: '85px' }} alt="" /></div>
              <div className="slide"><img src={img10} style={{ height: '100px', marginBlock: '55px' }} alt="" /></div>
              <div className="slide"><img src={img11} alt="" /></div>
              <div className="slide"><img src={img12} alt="" /></div>
          </div>
        </div>
  );
};

export default Sponsors;