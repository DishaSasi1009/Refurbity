// Initialize an empty cart array
let cart = [];

// Function to toggle adding/removing products
function toggleCart(productId, productName, productPrice) {
  const button = document.getElementById(`btn-${productId}`);
  
  // Check if the product is already in the cart
  const existingProductIndex = cart.findIndex(item => item.id === productId);
  
  if (existingProductIndex > -1) {
    // Product exists in cart, so remove it
    cart.splice(existingProductIndex, 1);
    button.textContent = 'Add to Cart'; // Change button text back
  } else {
    // Add product to cart
    const product = { id: productId, name: productName, price: productPrice };
    cart.push(product);
    button.textContent = 'Added'; // Change button text
  }

  updateCartCount();
  updateCartPage();
}

// Function to update the cart count badge
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = cart.length; // Update count
}

// Function to update the cart page (cart.html)
function updateCartPage() {
  const cartItemsContainer = document.getElementById('cart-items');

  // Clear the cart items
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    let totalPrice = 0;
    cart.forEach((item, index) => {
      totalPrice += item.price;
      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <p>${item.name} - $${item.price.toFixed(2)}</p>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
    });

    // Display total price and count
    document.getElementById('cart-total-price').textContent = totalPrice.toFixed(2);
  }
}

// Function to remove a product directly from the cart page
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  updateCartPage();
}
