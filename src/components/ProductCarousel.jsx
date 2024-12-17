import { useEffect, useRef, useState } from 'react';
import { showSlider, handleBackButton } from '../assets/Js/funciones';
import { getItems } from "../service/itemService";

const ProductCarousel = () => {
    const [items, setItems] = useState([]);
    const [activeItemIndex, setActiveItemIndex] = useState(null);
    const [isShowingAll, setIsShowingAll] = useState(false);
    const carouselRef = useRef(null);
    const nextButtonRef = useRef(null);
    const prevButtonRef = useRef(null);
    const backButtonRef = useRef(null);

    useEffect(() => {
        document.title = 'Pagina de Inicio';
        loadItems();

        // Asignar los eventos a los botones
        if (nextButtonRef.current && prevButtonRef.current) {
            nextButtonRef.current.onclick = () => showSlider('next');
            prevButtonRef.current.onclick = () => showSlider('prev');
        }

        if (backButtonRef.current) {
            backButtonRef.current.onclick = handleBackButton;
        }

        // Inicialización de las funciones de ver más detalles
        const seeMoreButtons = document.querySelectorAll('.More');
        seeMoreButtons.forEach((button) => {
            button.onclick = function () {
                carouselRef.current.classList.remove('next', 'prev');
                carouselRef.current.classList.add('showDetail');
            };
        });

    }, []);

    const loadItems = async () => {
        const data = await getItems();
        setItems(data);
    };

    const formatPrice = (price) => {
        const numPrice = Number(price);
        return isNaN(numPrice)
            ? "$0"
            : new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
            }).format(numPrice);
    };

    const handleExploreMore = (index) => {
        // Activar o desactivar la vista detallada del artículo específico
        setActiveItemIndex(prevIndex => prevIndex === index ? null : index);
        
        // Si existe una referencia de carrusel, agregue o elimine la clase showDetail
        if (carouselRef.current) {
            if (activeItemIndex === index) {
                carouselRef.current.classList.remove('showDetail');
            } else {
                carouselRef.current.classList.add('showDetail');
            }
        }
    };

    const handleShowAll = () => {
        // Cambiar el estado para mostrar todos los elementos
        setIsShowingAll(!isShowingAll);
        
        // Modificar las clases del carrusel para el efecto visual
        if (carouselRef.current) {
            carouselRef.current.classList.toggle('show-all');
            carouselRef.current.classList.remove('showDetail', 'next', 'prev');
        }
    };

    
    const transformedItems = items.map(item => ({
        imagen: item.imageUrl || "../src/assets/img/default-product.png", 
        titulo: item.name,
        tipo: item.category,
        des: item.description,
        more: "Explorar más",
        detalles: {
            Titulo: item.name,
            des: item.description,
            Especificaciones: [
                { tipo: "Categoría", descripcion: item.category },
                { tipo: "Precio", descripcion: `$${formatPrice(item.price)}` },
            ]
        }
    }));

    return (
        <section className="section section__height carrusel next" id="inicio">
           <div className="carrusel" id="inicio" ref={carouselRef}>
                <div className="lista">
                    {transformedItems.map((item, index) => (
                        <div className="item" key={index}>
                            <img src={item.imagen} alt={item.titulo} />
                            <div className="intro">
                                <div className="Titulo">{item.titulo}</div>
                                <div className="tipo">{item.tipo}</div>
                                <div className="des">{item.des}</div>
                                <button 
                                    className="More" 
                                    onClick={() => handleExploreMore(index)}
                                >
                                    {item.more} &#8599;
                                </button>
                            </div>
                            <div className="detalles">
                                <div className="Titulo">{item.detalles.Titulo}</div>
                                <div className="des">{item.detalles.des}</div>
                                <div className="Especificaciones">
                                    {item.detalles.Especificaciones.map((especificacion, i) => (
                                        <div key={i}>
                                            <p>{especificacion.tipo}</p>
                                            <p>{especificacion.descripcion}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="Boton">
                                    <button className="btn">Agregar al carro</button>
                                    <button className="btn">CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="arrows">
                    <button id="prev" ref={prevButtonRef}>
                        <i className="ri-arrow-left-wide-line"></i>
                    </button>
                    <button id="next" ref={nextButtonRef}>
                        <i className="ri-arrow-right-wide-line"></i>
                    </button>
                    <button 
                        id="back" 
                        onClick={handleShowAll}
                    >
                        {isShowingAll ? 'Ocultar' : 'Mostrar todo'} &#8599;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;