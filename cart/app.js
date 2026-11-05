// Shopping Cart Products
const products = [
    { id: 1, name: "Laptop", price: 85000 },
    { id: 2, name: "Smartphone", price: 45000 },
    { id: 3, name: "Headphones", price: 3500 },
    { id: 4, name: "Keyboard", price: 2500 },
    { id: 5, name: "Mouse", price: 1200 },
    { id: 6, name: "Monitor", price: 22000 },
];

// Get HTML elements
const productsContainer = document.getElementById("products-container");
const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

// Load saved cart safely
function loadCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem("shopping-cart"));

        if (!Array.isArray(savedCart)) {
            return [];
        }

        return savedCart.filter(function (item) {
            return (
                item &&
                Number.isInteger(item.id) &&
                products.some(function (product) {
                    return product.id === item.id;
                }) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0
            );
        });
    } catch (error) {
        console.error("Could not load saved cart:", error);
        return [];
    }
}

let cart = loadCart();

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("shopping-cart", JSON.stringify(cart));
}

// Display products
function displayProducts() {
    productsContainer.innerHTML = "";

    products.forEach(function (product) {
        const card = document.createElement("div");
        card.className = "product-card";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `KES ${product.price.toLocaleString()}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";

        button.addEventListener("click", function () {
            addToCart(product.id);
        });

        card.append(name, price, button);
        productsContainer.appendChild(card);
    });
}

// Add product to cart
function addToCart(id) {
    const existingItem = cart.find(function (item) {
        return item.id === id;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: id,
            quantity: 1,
        });
    }

    updateCart();
}

// Increase quantity
function increaseQuantity(id) {
    const item = cart.find(function (product) {
        return product.id === id;
    });

    if (item) {
        item.quantity++;
    }

    updateCart();
}

// Decrease quantity
function decreaseQuantity(id) {
    const item = cart.find(function (product) {
        return product.id === id;
    });

    if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }

    updateCart();
}

// Remove product
function removeFromCart(id) {
    cart = cart.filter(function (item) {
        return item.id !== id;
    });

    updateCart();
}

// Display cart
function displayCart() {
    cartContainer.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(function (item) {
        const product = products.find(function (product) {
            return product.id === item.id;
        });

        if (!product) return;

        totalItems += item.quantity;
        totalPrice += product.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const details = document.createElement("span");
        details.textContent = `${product.name} - KES ${product.price.toLocaleString()}`;

        const quantity = document.createElement("span");
        quantity.textContent = `Quantity: ${item.quantity}`;

        const controls = document.createElement("div");

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.addEventListener("click", function () {
            decreaseQuantity(item.id);
        });

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.addEventListener("click", function () {
            increaseQuantity(item.id);
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove";
        removeButton.addEventListener("click", function () {
            removeFromCart(item.id);
        });

        controls.append(decreaseButton, increaseButton, removeButton);
        cartItem.append(details, quantity, controls);
        cartContainer.appendChild(cartItem);
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = `KES ${totalPrice.toLocaleString()}`;
}

// Update everything
function updateCart() {
    saveCart();
    displayCart();
}

// Clear entire cart
clearCartButton.addEventListener("click", function () {
    cart = [];
    updateCart();
});

// Start application
displayProducts();
displayCart();
