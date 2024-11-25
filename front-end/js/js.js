let cart = [];
let allProducts = [];

async function loadTemplate(url) {
    const response = await fetch(url);
    return response.text();
}

async function loadProducts(category = null) {
    const template = await loadTemplate("template.ejs");
    const endpoint = category
        ? `http://localhost:3000/products/${category}`
        : "http://localhost:3000/products";

    const response = await fetch(endpoint);
    const products = await response.json();

    if (!category) allProducts = products;

    const renderedHtml = ejs.render(template, { data: products });
    document.getElementById("content").innerHTML = renderedHtml;

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            const product = allProducts.find(p => p.id == productId);
            cart.push(product);
            updateCart();
        });
    });
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)}</p>
        </div>
    `).join("");

    cartItems.innerHTML += `
        <div class="cart-total">
            <strong>Total:</strong>
            <strong>$${total.toFixed(2)}</strong>
        </div>
    `;
}

// Mostrar u ocultar el carrito
document.getElementById("cart-icon").addEventListener("click", () => {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.classList.toggle("hidden");
});

// Filtrar productos por categoría
document.querySelectorAll("#categories ul li").forEach(category => {
    category.addEventListener("click", () => {
        const selectedCategory = category.textContent.toLowerCase();

        // Quitar la clase "selected" de todas las categorías
        document.querySelectorAll("#categories ul li").forEach(cat => {
            cat.classList.remove("selected");
        });

        // Añadir la clase "selected" a la categoría seleccionada
        category.classList.add("selected");

        // Si se selecciona "Todos", cargar todos los productos
        if (selectedCategory === "todos") {
            loadProducts();
        } else {
            loadProducts(selectedCategory);
        }
    });
});


loadProducts();
