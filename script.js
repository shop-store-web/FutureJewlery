document.addEventListener("DOMContentLoaded", function () {
  // Function to add item to cart and redirect to confirmation page
  function addToCart(productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'added.html'; // Redirect to "Item Added" confirmation page
  }

  // Load items into cart.html
  function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    let total = 0;

    cartList.innerHTML = '';  // Clear existing cart items

    cartItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
                      <button onclick="removeFromCart(${index})">Remove</button>`;
      cartList.appendChild(li);
      total += item.price;
    });

    totalEl.textContent = total.toFixed(2);
  }

  // Remove item from cart
  function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1); // Remove the item at the given index
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Update local storage
    loadCart(); // Re-render the cart
  }

  // Load checkout summary on checkout.html page
  function loadCheckout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutList = document.getElementById('checkout-items');
    const totalEl = document.getElementById('checkout-total');
    let total = 0;

    const itemsText = [];

    checkoutList.innerHTML = ''; // Clear the checkout items

    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      checkoutList.appendChild(li);
      total += item.price;
      itemsText.push(`${item.name} - $${item.price.toFixed(2)}`);
    });

    totalEl.textContent = total.toFixed(2); // Update total

    // Populate hidden fields for EmailJS
    document.getElementById('hidden-items').value = itemsText.join("\n");
    document.getElementById('hidden-total').value = `$${total.toFixed(2)}`;
  }

  // Submit checkout form using EmailJS
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission

      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)  // Send form via EmailJS
        .then(function () {
          form.style.display = 'none';  // Hide form
          document.getElementById('confirmation-message').style.display = 'block';  // Show confirmation message
          localStorage.removeItem('cart');  // Clear cart after submission
        }, function (error) {
          alert('There was an error sending your order. Please try again.');
          console.error('EmailJS error:', error);
        });
    });
  }

  // Page-specific logic

  // Cart page: load cart items when page loads
  if (window.location.pathname.includes('cart.html')) {
    loadCart();
  }

  // Checkout page: load checkout info when page loads
  if (window.location.pathname.includes('checkout.html')) {
    loadCheckout();
  }

  // Buy Now button event listeners for product pages
  const buyNowButtons = document.querySelectorAll('.buy-now');
  buyNowButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productName = button.getAttribute('data-product-name');
      const productPrice = parseFloat(button.getAttribute('data-product-price'));
      addToCart(productName, productPrice);
    });
  });

});
