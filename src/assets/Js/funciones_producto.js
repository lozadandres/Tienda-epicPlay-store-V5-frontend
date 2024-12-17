export function filterProducts(category) {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        if (category === 'todos') {
            product.style.display = 'block';
        } else {
            product.style.display = product.getAttribute('data-category') === category ? 'block' : 'none';
        }
    });
}

export function toggleDescription(image) {
    const description = image.nextElementSibling.nextElementSibling; // Encuentra el párrafo de descripción
    if (description.style.display === "none" || description.style.display === "") {
        description.style.display = "block"; // Muestra la descripción
    } else {
        description.style.display = "none"; // Oculta la descripción
    }
}
export function showImage(image, newSrc) {
    image.setAttribute('data-original', image.src); // Guarda la imagen original
    image.src = newSrc; // Cambia la imagen al hover
 }

 export function hideImage(image) {
    image.src = image.getAttribute('data-original'); // Restaura la imagen original
 }



