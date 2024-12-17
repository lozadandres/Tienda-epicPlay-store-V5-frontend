// Crear la URL base de la API
const API_URL = "http://localhost:5000/items";

// Funci贸n para obtener todos los elementos
export const getItems = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

// Funci贸n para agregar un nuevo usuario
export const addItem = async (item) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(item),
    });
    return await response.json();
};

// Funci贸n para actualizar un usuario
export const updateItem = async (id, item) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
    });
    return await response.json();
};

// Funci贸n para eliminar un usuario
export const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}` , {
        method: "DELETE"
    });
};