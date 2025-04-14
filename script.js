// Add item to cart and redirect to confirmation
function addToCart(productName, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name: productName, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'added.html';
}

// Load items into cart.html
function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  let total = 0;

  cartList.innerHTML = '';

  cartItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  loadCart();
}

// Load checkout summary
function loadCheckout() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const checkoutList = document.getElementById('checkout-items');
  const totalEl = document.getElementById('checkout-total');
  let total = 0;

  const itemsText = [];

  checkoutList.innerHTML = '';

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    checkoutList.appendChild(li);
    total += item.price;
    itemsText.push(`${item.name} - $${item.price.toFixed(2)}`);
  });

  totalEl.textContent = total.toFixed(2);

  // Populate hidden fields for EmailJS
  document.getElementById('hidden-items').value = itemsText.join("\n");
  document.getElementById('hidden-total').value = `$${total.toFixed(2)}`;
}

// Submit checkout form using EmailJS
const form = document.getElementById('checkout-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(function () {
        form.style.display = 'none';
        document.getElementById('confirmation-message').style.display = 'block';
        localStorage.removeItem('cart');
      }, function (error) {
        alert('There was an error sending your order. Please try again.');
        console.error('EmailJS error:', error);
      });
  });
}

// Page-specific loaders
if (window.location.pathname.includes('cart.html')) {
  window.addEventListener('DOMContentLoaded', loadCart);
}

if (window.location.pathname.includes('checkout.html')) {
  window.addEventListener('DOMContentLoaded', loadCheckout);
}


