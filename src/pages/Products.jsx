// src/pages/Contact.jsx
import { useEffect, useState } from 'react';
import { getItems } from '../service/itemService';
import Swal from "sweetalert2";

const Products = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    document.title = 'Pagina de Productos';
    loadItems();
  }, []);

  const loadItems = async () => {
      const data = await getItems();
      setItems(data);
      setFilteredItems(data);
  };
  
  const categories = [
    "Consolas y Videojuegos",
    "Periféricos y Accesorios",
    "Componentes de PC",
    "Mobiliario Gamer",
    "EQUIPOS PC ENSAMBLADOS",
    "MONITORES",
    "PORTÁTILES",
  ];

  const imageMap = {
    "Consolas y Videojuegos": "../src/assets/img/gaming--Uk6eZy1.png",
    "Periféricos y Accesorios": "../src/assets/img/imagenh1.png",
    "Componentes de PC": "../src/assets/img/placaactualizada-430x430.png",
    "Mobiliario Gamer": "../src/assets/img/mgdrgb_960x960.png",
    "EQUIPOS PC ENSAMBLADOS": "../src/assets/img/Bionic-Infographic700x700px-002-600x600-1.webp",
    "MONITORES": "../src/assets/img/1024-5-1.webp",
    "PORTÁTILES": "../src/assets/img/bdb41a78-23cd-450d-a173-91da4553bbaf.png.webp",
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = items.filter((item) => item.category === category);
    setFilteredItems(filtered);
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    setFilteredItems(items); // Mostrar todos los productos
  };

  const showProductModal = (product) => {
    setSelectedProduct(product);
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex'; // Mostrar el modal
  };

  const closeProductModal = () => {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none'; // Ocultar el modal
    setSelectedProduct(null);
  };

  const showAddedToCartAlert = (item) => {
    Swal.fire({
      title: 'Agregado al carrito',
      text: `${item.name} se ha agregado al carrito`,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      position: 'bottom-end',
      toast: true,
      background: '#fff',
      color: '#000'
    });
  };

  const handleCheckout = () => {
    Swal.fire({
      title: '¡Gracias por tu compra!',
      text: 'Tu pedido ha sido procesado exitosamente',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3a043a',
      background: '#fff',
      color: '#000'
    }).then(() => {
      setCart([]);
      setIsCartVisible(false);
    });
  };

  const addToCart = (item) => {
    //Comprueba si el artículo ya está en el carrito
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    
    if (existingItem) {
      // Si el artículo existe, aumenta la cantidad
      setCart(cart.map(cartItem => 
        cartItem._id === item._id 
          ? {...cartItem, quantity: cartItem.quantity + 1} 
          : cartItem
      ));
    } else {
      // Si el artículo no está en el carrito, agréguelo con la cantidad 1
      setCart([...cart, {...item, quantity: 1}]);
    }

    
    showAddedToCartAlert(item);
    setIsCartVisible(true);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId));
    // Si el carrito está vacío, lo ocultamos
    if (cart.length === 1) {  // Usamos 1 porque el filtro aún no se ha aplicado
      setIsCartVisible(false);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // Si la cantidad es menor a 1, elimine el artículo
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item._id === itemId 
          ? {...item, quantity: newQuantity} 
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <section className="container section section__height hero" id="categoria">
      <h2 className="section__title">Categorías</h2>
      <img src="../src/assets/img/LogoGamerIlustra.png" alt="" className="logo_category" />

      <div className="container">
        <ul className="collection-list has-scrollbar">
          
        {categories.map((category) => (
            <li key={category}>
              <div
                className={`collection-card ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <h3 className="h4 card-title">{category}</h3>
                {/* Usar imagen específica según la categoría */}
                <img src={imageMap[category]} alt={category} />
                <button className="btn btn-secondary">
                  <span>Explorar más</span>
                </button>
              </div>
            </li>
          ))}

        </ul> 
      </div> 

      {selectedCategory && (
        <button className="btn btn-primary" onClick={clearFilter}>
          Mostrar todas las categorías
        </button>
      )}

      <div className="contenedor-items">
        <h2 className="section__title">Productos</h2>
        <div>
          <img src="../src/assets/img/character-3.png" alt="Game character" className="character character-3" style={{position: 'absolute'}}/>
        </div>
        <ul className="collection-list has-scrollbar product-container">
            {filteredItems.map(item => (
              <li key={item._id}>
                <div className="collection-card product">
                  <img src={item.imageUrl || "../src/assets/img/default-product.png"} alt={item.name} style={{width: 'auto'}} />
                  <h3 className="h4 card-title">{item.name}</h3>
                  <div style={{display: 'flex'}}>
                    <button 
                      onClick={() => showProductModal(item)} 
                      className="btn btn-secondary"
                    >
                      <span>Explorar más</span>
                    </button>
                    <button 
                      onClick={() => addToCart(item)} 
                      className="btn btn-secondary boton-item"
                    >
                      <i className='bx bx-cart-add'></i>
                    </button>
                  </div>
                  <div className="item" style={{color:'#fff'}}>
                    <span className="titulo-item">{item.description}</span>
                    <br />
                    <span className="precio-item">${item.price}</span> 
                    <br />
                    <span className="precio-item">{item.category}</span>   
                  </div>
                </div>
              </li>
            ))}
          </ul> 

          <dialog 
            id="productModal" 
            className="product-modal"
            style={{
              display: 'none', 
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.9)',
              color: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              border: 'none',
              padding: 0,
            }}
          >
            {selectedProduct && (
              <div 
                className="modal-content" 
                style={{
                  backgroundColor: '#1a1a1a',
                  padding: '2rem',
                  borderRadius: '10px',
                  width: '100%',
                  height: '100vh',
                  overflowY: 'auto',
                  marginTop: '225px'
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <h2>{selectedProduct.name}</h2>
                  <button 
                    onClick={closeProductModal} 
                    style={{
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: 'none',
                      fontSize: '2rem',
                      cursor: 'pointer'
                    }}
                  >
                    &times;
                  </button>
                </div>
                <div style={{display: 'flex', gap: '2rem'}}>
                  <img 
                    src={selectedProduct.imageUrl || "../src/assets/img/default-product.png"} 
                    alt={selectedProduct.name} 
                    style={{maxWidth: '300px', objectFit: 'contain'}} 
                  />
                  <div>
                    <p><strong>Categoría:</strong> {selectedProduct.category}</p>
                    <p><strong>Precio:</strong> ${selectedProduct.price}</p>
                    <p><strong>Descripción:</strong> {selectedProduct.description}</p>
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        closeProductModal();
                      }}
                      style={{
                        backgroundColor: '#3a043a',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        marginTop: '1rem'
                      }}
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            )}
          </dialog>  
       </div> 

       <div className="carrito" style={{
          marginRight: isCartVisible ? '0' : '-100%',
          opacity: isCartVisible ? '1' : '0'
        }}>
          <div className="header-carrito">
                <h2>Tu Carrito</h2>
          </div>
          <div className="carrito-items">
            {cart.map(item => (
              <div key={item._id} className="carrito-item" style={{borderBottomStyle: 'dashed'}}>
                <img src={item.imageUrl} width="80px" alt={item.name} />
                <div className="carrito-item-detalles">
                  <span className="carrito-item-titulo">{item.name}</span>
                  <div className="selector-cantidad">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="restar-cantidad"
                    >
                    <i className="ri-subtract-fill"></i>
                    </button>
                    <input 
                      type="text" 
                      value={item.quantity} 
                      className="carrito-item-cantidad" 
                      readOnly 
                    />
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="sumar-cantidad"
                    >
                      <i className="ri-add-fill"></i>
                    </button>
                  </div>
                  <span className="carrito-item-precio">${item.price}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="btn-eliminar"
                >
                  <i className="ri-delete-bin-6-fill"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="carrito-total">
            <span className="carrito-precio-total">
              Total: ${calculateTotal()}
            </span>
            <button className="btn-pagar" onClick={() => {
              handleCheckout();
              setCart([]);
            }}>
              Pagar
            </button>
          </div>
        </div>           
    </section>
        
  );
};

export default Products;