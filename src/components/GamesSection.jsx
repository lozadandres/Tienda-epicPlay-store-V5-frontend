import MonsterHunter from '../assets/img/Monster Hunter.jpg';
import Minecraft from '../assets/img/minecraft_480x580fill_ffffff.webp';
import Warzone from '../assets/img/Warzone-2-PC-Streaming-Gamer.webp';
import Fifa from '../assets/img/Fifa24.jpeg';
import Forza from '../assets/img/Forza Horizon5.jpeg';
import Goodofwar from '../assets/img/God of war.jpg';
import Halo from '../assets/img/Halo Infinite.jpeg';
import gta from '../assets/img/gta-5_480x580fill_ffffff.webp';
import fortnite from '../assets/img/fortnite-1513195354733_480x580fill_ffffff.webp';

const GamesSection = () => {
    const images = [MonsterHunter, Minecraft, Warzone, Fifa, Forza, Goodofwar, Halo, gta, fortnite];
    const totalItems = images.length;

    return (
        <>
            <section className="container section section__height" id="juegos">
                <h2 className="section__title">Juegos</h2>

                <div className="Todo">
                    <div className="banner">
                        <div className="Games" style={{ '--quantity': totalItems }}>
                            {images.map((img, index) => (
                                <div className="item" key={index} style={{ '--position': index + 1 }}>
                                    <img src={img} alt={` Game ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hero-banner">
                    <img src="../src/assets/img/hero-banner.png" width="850" height="414" alt="hero banner" className="w-100" />
                    <img src="../src/assets/img/hero-banner-bg.png" alt="" className="hero-banner-bg" />
                </div>
            </section>
        </>
    );
};

export default GamesSection;