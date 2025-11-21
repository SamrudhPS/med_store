// Products Database
const products = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        category: "Pain Relief",
        price: 25,
        oldPrice: 35,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
        description: "Effective pain and fever relief. Take 1-2 tablets every 4-6 hours.",
        rating: 4.5,
        stock: 150,
        discount: 29
    },
    {
        id: 2,
        name: "Vitamin C Tablets (60 Count)",
        category: "Supplements",
        price: 150,
        oldPrice: 200,
        image: "https://images.unsplash.com/photo-1550572017-4396ddecb488?w=400",
        description: "Boost your immunity with 1000mg Vitamin C. Take 1 tablet daily.",
        rating: 4.8,
        stock: 80,
        discount: 25
    },
    {
        id: 3,
        name: "Hand Sanitizer 500ml",
        category: "Hygiene",
        price: 80,
        oldPrice: 100,
        image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400",
        description: "99.9% germ protection. Alcohol-based sanitizer with moisturizers.",
        rating: 4.3,
        stock: 200,
        discount: 20
    },
    {
        id: 4,
        name: "Digital Thermometer",
        category: "Medical Devices",
        price: 299,
        oldPrice: 450,
        image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400",
        description: "Fast and accurate temperature reading in 30 seconds. Digital display.",
        rating: 4.6,
        stock: 50,
        discount: 34
    },
    {
        id: 5,
        name: "Face Masks (50 pieces)",
        category: "Safety",
        price: 250,
        oldPrice: 350,
        image: "https://images.unsplash.com/photo-1585416472446-82ee0cd68b15?w=400",
        description: "3-layer protection masks. Disposable and comfortable fit.",
        rating: 4.4,
        stock: 120,
        discount: 29
    },
    {
        id: 6,
        name: "Calcium + D3 Tablets",
        category: "Supplements",
        price: 200,
        oldPrice: 280,
        image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400",
        description: "Strengthen bones and teeth. 60 tablets with Vitamin D3 for better absorption.",
        rating: 4.7,
        stock: 90,
        discount: 29
    },
    {
        id: 7,
        name: "Antiseptic Cream 50g",
        category: "First Aid",
        price: 65,
        oldPrice: 85,
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400",
        description: "Wound healing cream with antiseptic properties. Apply 2-3 times daily.",
        rating: 4.2,
        stock: 180,
        discount: 24
    },
    {
        id: 8,
        name: "Blood Pressure Monitor",
        category: "Medical Devices",
        price: 1500,
        oldPrice: 2000,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400",
        description: "Digital BP monitor with LCD display. Memory function for 60 readings.",
        rating: 4.5,
        stock: 35,
        discount: 25
    },
    {
        id: 9,
        name: "Bandage Roll (6 pack)",
        category: "First Aid",
        price: 120,
        oldPrice: 160,
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400",
        description: "Elastic cotton bandage for wound dressing. 6 rolls of 5cm x 4m.",
        rating: 4.1,
        stock: 140,
        discount: 25
    },
    {
        id: 10,
        name: "Omega-3 Fish Oil Capsules",
        category: "Supplements",
        price: 350,
        oldPrice: 450,
        image: "https://images.unsplash.com/photo-1526671267731-da2e3a3f7aaf?w=400",
        description: "Heart health support. 60 capsules with EPA and DHA. Take 1 capsule daily.",
        rating: 4.6,
        stock: 70,
        discount: 22
    },
    {
        id: 11,
        name: "Cough Syrup 100ml",
        category: "Pain Relief",
        price: 85,
        oldPrice: 110,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
        description: "Relief from dry and wet cough. Sugar-free formula. Take 10ml 3 times daily.",
        rating: 4.3,
        stock: 160,
        discount: 23
    },
    {
        id: 12,
        name: "First Aid Kit",
        category: "First Aid",
        price: 450,
        oldPrice: 600,
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400",
        description: "Complete first aid kit with bandages, antiseptic, scissors, and more.",
        rating: 4.7,
        stock: 45,
        discount: 25
    }
];

// State Management
let cart = [];
let wishlist = [];
let currentCategory = 'All';
let currentSort = 'default';
let filteredProducts = [...products];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    displayProducts(products);
    updateCartCount();
    updateWishlistCount();
    displayDeals();
});

// Local Storage Functions
function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loadFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedWishlist) wishlist = JSON.parse(savedWishlist);
}

// Display Products
function displayProducts(productsToShow) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem; color: #999;">No products found</p>';
        return;
    }
    
    productsToShow.forEach(product => {
        const isInWishlist = wishlist.some(item => item.id === product.id);
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            ${product.discount ? `<span class="product-badge">${product.discount}% OFF</span>` : ''}
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlistItem(${product.id}, event)">
                ${isInWishlist ? '❤️' : '🤍'}
            </button>
            <img src="${product.image}" alt="${product.name}" onclick="showProductDetail(${product.id})">
            <p class="product-category">${product.category}</p>
            <h3 onclick="showProductDetail(${product.id})">${product.name}</h3>
            <div class="product-rating">${'⭐'.repeat(Math.floor(product.rating))} ${product.rating}</div>
            <div class="product-price">
                ₹${product.price}
                ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ''}
            </div>
            <p style="color: ${product.stock > 20 ? '#27ae60' : '#e74c3c'}; font-size: 0.9rem; margin: 0.5rem 0;">
                ${product.stock > 20 ? 'In Stock' : `Only ${product.stock} left!`}
            </p>
            <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart(${product.id}, event)">Add to Cart</button>
                <button class="btn-view" onclick="showProductDetail(${product.id})">👁️</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Display Deals
function displayDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    const dealProducts = products.filter(p => p.discount && p.discount >= 25).slice(0, 4);
    
    dealProducts.forEach(product => {
        const dealCard = document.createElement('div');
        dealCard.className = 'product-card';
        dealCard.innerHTML = `
            <span class="product-badge">${product.discount}% OFF</span>
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="product-price">
                ₹${product.price}
                <span class="old-price">₹${product.oldPrice}</span>
            </div>
            <button class="btn-add-cart" onclick="addToCart(${product.id}, event)">Add to Cart</button>
        `;
        dealsGrid.appendChild(dealCard);
    });
}

// Search Products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// Search on Enter key
document.getElementById('searchInput')?.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    } else {
        // Real-time search
        searchProducts();
    }
});

// Filter by Category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active pill
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (category === 'All') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    applySorting();
    displayProducts(filteredProducts);
}

// Sort Products
function sortProducts() {
    currentSort = document.getElementById('sortSelect').value;
    applySorting();
    displayProducts(filteredProducts);
}

function applySorting() {
    switch(currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts = currentCategory === 'All' ? 
                [...products] : 
                products.filter(p => p.category === currentCategory);
    }
}

// Cart Functions
function addToCart(productId, event) {
    if (event) event.stopPropagation();
    
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
            showNotification('Quantity updated in cart! 🛒');
        } else {
            showNotification('Maximum stock limit reached! ⚠️', 'warning');
            return;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
        showNotification('Added to cart! 🛒');
    }
    
    updateCartCount();
    saveToLocalStorage();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCart();
    saveToLocalStorage();
    showNotification('Removed from cart');
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (item) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else if (newQuantity <= product.stock) {
            item.quantity = newQuantity;
            updateCartCount();
            displayCart();
            saveToLocalStorage();
        } else {
            showNotification('Maximum stock limit reached! ⚠️', 'warning');
        }
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const totalPriceEl = document.getElementById('totalPrice');
    const deliveryChargeEl = document.getElementById('deliveryCharge');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-message">Your cart is empty 🛒</p>';
        subtotalEl.textContent = '0';
        totalPriceEl.textContent = '0';
        deliveryChargeEl.textContent = 'Free';
        return;
    }
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${itemTotal}</p>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
                    <span style="padding: 0 10px; font-weight: bold;">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    const deliveryCharge = subtotal >= 500 ? 0 : 50;
    const total = subtotal + deliveryCharge;
    
    subtotalEl.textContent = subtotal;
    deliveryChargeEl.textContent = deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`;
    totalPriceEl.textContent = total;
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        displayCart();
    }
}

// Wishlist Functions
function toggleWishlistItem(productId, event) {
    if (event) event.stopPropagation();
    
    const product = products.find(p => p.id === productId);
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showNotification('Removed from wishlist');
    } else {
        wishlist.push(product);
        showNotification('Added to wishlist! ❤️');
    }
    
    updateWishlistCount();
    displayProducts(filteredProducts);
    saveToLocalStorage();
}

function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    wishlistCount.textContent = wishlist.length;
}

function displayWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<p class="empty-message">Your wishlist is empty ❤️</p>';
        return;
    }
    
    wishlistItems.innerHTML = '';
    
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'cart-item';
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">₹${item.price}</p>
                <div class="cart-item-actions">
                    <button class="btn-add-cart" onclick="addToCart(${item.id}, event); toggleWishlistItem(${item.id}, event)">
                        Move to Cart
                    </button>
                    <button class="btn-remove" onclick="toggleWishlistItem(${item.id}, event); displayWishlist()">Remove</button>
                </div>
            </div>
        `;
        wishlistItems.appendChild(wishlistItem);
    });
}

function toggleWishlist() {
    const modal = document.getElementById('wishlistModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        displayWishlist();
    }
}

// Product Detail Modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const productDetail = document.getElementById('productDetail');
    
    productDetail.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <div class="product-rating">${'⭐'.repeat(Math.floor(product.rating))} ${product.rating} / 5</div>
            <p class="product-category">${product.category}</p>
            <div class="product-price">
                ₹${product.price}
                ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ''}
            </div>
            ${product.discount ? `<p style="color: #ff4757; font-weight: bold;">Save ${product.discount}%!</p>` : ''}
            <p style="color: ${product.stock > 20 ? '#27ae60' : '#e74c3c'}; font-weight: bold; margin: 1rem 0;">
                ${product.stock > 20 ? '✓ In Stock' : `⚠️ Only ${product.stock} left!`}
            </p>
            <div class="product-description">
                <h3>Description</h3>
                <p>${product.description}</p>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn-primary" style="flex: 1;" onclick="addToCart(${product.id}); closeProductModal()">
                    Add to Cart
                </button>
                <button class="btn-primary" style="flex: 1; background: #ff4757;" onclick="addToCart(${product.id}); closeProductModal(); toggleCart()">
                    Buy Now
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

// Login Modal
function toggleLogin() {
    const modal = document.getElementById('loginModal');
    modal.classList.toggle('active');
}

function handleLogin(event) {
    event.preventDefault();
    showNotification('Login feature coming soon! 🔐', 'info');
    toggleLogin();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty! 🛒', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCharge = total >= 500 ? 0 : 50;
    const finalTotal = total + deliveryCharge;
    
    const itemsList = cart.map(item => `${item.name} (x${item.quantity})`).join('\n');
    
    showNotification('Order placed successfully! 🎉\n\nYour medicines will be delivered soon.', 'success');
    
    cart = [];
    updateCartCount();
    displayCart();
    toggleCart();
    saveToLocalStorage();
}

// Contact Form
function submitContact() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!name || !email || !message) {
        showNotification('Please fill all fields! ⚠️', 'warning');
        return;
    }
    
    showNotification('Message sent successfully! We will contact you soon. 📧', 'success');
    
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
}

// Notifications
function showNotification(message, type = 'success') {
    const colors = {
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scroll
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Close modals on outside click
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);