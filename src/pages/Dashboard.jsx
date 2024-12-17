import { useState, useEffect,useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getItems, addItem, updateItem, deleteItem } from "../service/itemService";

const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de sesión
    const navigate = useNavigate(); // Hook para redirección
    const [isSuperUser, setIsSuperUser] = useState(false);
    const menuDashboardRef = useRef(null);
    const iconoMenuRef = useRef(null);

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = () => {
        const loginData = localStorage.getItem("login_success");
        
        if (!loginData) {
            redirectToLogin("Debe iniciar sesión para acceder al Dashboard");
            return;
        }

        try {
            const userData = JSON.parse(loginData);
            
            if (!userData.isSuperUser) {
                redirectToLogin("Acceso denegado. Solo administradores pueden acceder al Dashboard.");
                return;
            }

            setIsLoggedIn(true);
            setIsSuperUser(true);
            loadItems(); // Cargar items solo si es superusuario

        } catch (error) {
            console.error("Error al verificar autenticación:", error);
            redirectToLogin("Error de autenticación");
        }
    };

    const redirectToLogin = (message) => {
        Swal.fire({
            icon: "error",
            title: "Acceso Denegado",
            text: message,
            confirmButtonColor: "#3a043a",
            background: "#fff",
            color: "#000",
        }).then(() => {
            localStorage.removeItem("login_success");
            window.location.href = '/';
        });
    };

    const handleLogout = () => {
        Swal.fire({
            icon: "info",
            title: "Cerrar Sesión",
            text: "¿Estás seguro de que quieres cerrar la sesión?",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            confirmButtonColor: "#3a043a",
            cancelButtonText: "Cancelar",
            background: "#fff",
            color: "#000",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("login_success"); // Eliminar datos del usuario logueado
                setIsLoggedIn(false);
                Swal.fire({
                    icon: "success",
                    title: "Sesión Cerrada",
                    text: "Sesión cerrada correctamente",
                    confirmButtonColor: "#3a043a",
                    background: "#fff",
                    color: "#000",
                }).then(() => {
                    navigate("/"); // Redirigir al login
                });
            }
        });
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleEnlaceClick = () => {
        setMenuOpen(false);
    };

    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ 
        name: "", 
        description: "", 
        price: "0",
        category: "" 
    });
    const [editingId, setEditingId] = useState(null);

    const categories = [
        "Consolas y Videojuegos",
        "Periféricos y Accesorios",
        "Componentes de PC",
        "Mobiliario Gamer",
        "EQUIPOS PC ENSAMBLADOS",
        "MONITORES",
        "PORTÁTILES",
        "Otros"
    ];

    useEffect(() => {
        loadItems();
        // Comprobar estado de login
        const loginData = localStorage.getItem("login_success");
        setIsLoggedIn(!!loginData); // Actualiza el estado según los datos en localStorage
    }, []);

    const loadItems = async () => {
        const data = await getItems();
        setItems(data);
    };

    const handleChange = (e) => {
        const value = e.target.name === 'price' ? 
        (e.target.value === '' ? '0' : e.target.value) : 
        e.target.value;
        setForm({ ...form, [e.target.name]: value });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formToSubmit = {
        ...form,
        price: Math.max(Number(form.price), 1000),
        };

        if (editingId) {
        await updateItem(editingId, formToSubmit);
        Swal.fire({
            title: "Actualizado",
            text: "Elemento actualizado con éxito",
            icon: "success",
            confirmButtonText: "OK",
            background: '#fff',
            color: '#000'
        });
        setEditingId(null);
        } else {
        await addItem(formToSubmit);
        Swal.fire({
            title: "Agregado",
            text: "Elemento agregado con éxito",
            icon: "success",
            confirmButtonText: "OK",
            background: '#fff',
            color: '#000'
        });
        }
        setForm({ name: "", description: "", price: "1000", category: "" });
        loadItems();
        location.reload();
    };

    const handleEdit = (item) => {
        setForm({
        ...item,
        price: formatPrice(item.price)
        });
        setEditingId(item._id);
        Swal.fire({
        title: "Modo de edición",
        text: `Editando: ${item.name}`,
        icon: "info",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#3a043a",
        background: '#fff',
        color: '#000'
        });
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3a043a",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        background: '#fff',
        color: '#000'
        });

        if (result.isConfirmed) {
        await deleteItem(id);
        Swal.fire("Eliminado", "El elemento ha sido eliminado.", "success");
        loadItems();
        location.reload();
        }
    };

    if (!isSuperUser) {
        return null;
    }
    return (
        
        <section className="" >
            <div style={{display:'flex'}}>
                <div
                    className={`menu-dashboard ${menuOpen ? "open" : ""}`}
                    ref={menuDashboardRef}
                >
                    <div className="top-menu">
                        <div className="logo">
                            <span>EpicPlay Store</span>
                        </div>
                        <div className="toggle" onClick={toggleMenu}>
                            <i
                                className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}
                                ref={iconoMenuRef}
                            ></i>
                        </div>
                    </div>
                    <div className="input-search">
                        <i className="bx bx-search-alt"></i>
                        <input type="text" className="input" placeholder="Buscar" />
                    </div>
                    <div className="menu">
                        {[
                            { icon: "bxs-dashboard", text: "Dashboard" },
                            { icon: "bx-box", text: "Productos" },
                            { icon: "bx-user", text: "Administrador" },
                            { icon: "bx-category", text: "Categorías" },
                            { icon: "bx-cog", text: "Ajustes" },
                        ].map((enlace, index) => (
                            <div
                                key={index}
                                className="enlace"
                                onClick={handleEnlaceClick}
                            >
                                <i className={`bx ${enlace.icon}`}></i>
                                <span>{enlace.text}</span>
                            </div>
                        ))}
                        {isLoggedIn && (
                            <div className="enlace" onClick={handleLogout}>
                                <i className="bx bx-log-out"></i>
                                <span>Cerrar sesión</span>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <div className="container">
                        <h1>CRUD App con React y Express</h1>
                        <form onSubmit={handleSubmit} className="formCrud">
                            <input
                                name="name"
                                placeholder="Nombre"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="description"
                                placeholder="Descripción"
                                value={form.description}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="price"
                                type="number"
                                placeholder="Precio"
                                value={form.price}
                                onChange={handleChange}
                                step="100"
                                min="1000"
                                required
                            />
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar categoría</option>
                                {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                                ))}
                            </select>
                            <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
                        </form>

                        <div className="item-count">
                            <h2>Total de elementos: {items.length}</h2>
                        </div>

                        <div className="item-list" style={{backgroundColor: 'hsla(244, 16%, 92%, 0.6)',
                        border: '2px solid hsla(244, 16%, 92%, 0.75)',
                        borderRadius: '20px',
                        padding: '20px',
                        fontSize: 'x-large',
                        fontWeight: 'bold'}}>
                        {items.map((item) => (
                            <div key={item._id} className="item" style={{color: '#000',marginBlock: '20px'}}>
                                <span>
                                    <strong>{item.name}</strong>: {item.description} - 
                                    <strong> Precio: {formatPrice(item.price)}</strong>
                                    <em className="category-tag"> Categoría: {item.category}</em>
                                </span>
                                <div className="item-buttons">
                                    <button className="edit-btn" onClick={() => handleEdit(item)} style={{backgroundColor:'#3A043A',padding:'10px', color:'#fff'}}>
                                    <i className="ri-edit-box-fill"></i> Editar
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(item._id)} style={{padding:'10px'}}>
                                    <i className="ri-delete-bin-6-fill"></i> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;