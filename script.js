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
}
