function addToCart(productName, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name: productName, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} added to cart!`);
}

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  let total = 0;

  cartList.innerHTML = '';

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total.toFixed(2);
}

function checkout() {
  alert('Thank you for your purchase!');
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
}

// If on cart page, load cart
if (window.location.pathname.includes('cart.html')) {
  window.addEventListener('DOMContentLoaded', loadCart);
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

const form = document.getElementById('checkout-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(function () {
        // Hide form, show confirmation message
        form.style.display = 'none';
        document.getElementById('confirmation-message').style.display = 'block';

        // Clear cart
        localStorage.removeItem('cart');
      }, function (error) {
        alert('There was an error sending your order. Please try again.');
        console.error('EmailJS error:', error);
      });
  });
}

if (window.location.pathname.includes('checkout.html')) {
  window.addEventListener('DOMContentLoaded', loadCheckout);
}

