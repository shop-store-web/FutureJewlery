document.addEventListener("DOMContentLoaded", function () {

  // Add item to cart and redirect to "Item Added" page
  function addToCart(productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'added.html';  // Redirect to "Item Added" confirmation page
  }

  // Buy now: Add item to cart and redirect to checkout page
  function buyNow(productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';  // Redirect to checkout page
  }

  // Attach event listeners to the buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productName = button.getAttribute('data-product-name');
      const productPrice = parseFloat(button.getAttribute('data-price'));
      addToCart(productName, productPrice);
    });
  });

  const buyNowButtons = document.querySelectorAll('.buy-now');
  buyNowButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productName = button.getAttribute('data-product-name');
      const productPrice = parseFloat(button.getAttribute('data-price'));
      buyNow(productName, productPrice);
    });
  });

  // Checkout logic
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();  // Prevent default form submission

      // Get the client's email and order details
      const clientEmail = document.getElementById('client-email').value;
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      let orderDetails = '';
      let totalPrice = 0;

      cartItems.forEach(item => {
        orderDetails += `${item.name} - $${item.price.toFixed(2)}\n`;
        totalPrice += item.price;
      });

      // Send confirmation email to the client and owner (JohnPerguz@proton.me)
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function () {
          // Email to client
          emailjs.send('YOUR_SERVICE_ID', 'client_order_template', {
            client_email: clientEmail,
            order_details: orderDetails,
            total_price: `$${totalPrice.toFixed(2)}`
          }).then(function () {
            // Email to owner (JohnPerguz@proton.me)
            emailjs.send('YOUR_SERVICE_ID', 'owner_order_template', {
              client_email: clientEmail,
              order_details: orderDetails,
              total_price: `$${totalPrice.toFixed(2)}`
            }).then(function () {
              // Show confirmation message after successful submission
              form.style.display = 'none';
              document.getElementById('confirmation-message').style.display = 'block';
              localStorage.removeItem('cart');  // Clear the cart after submission
            }, function (error) {
              console.error('Error sending email to owner:', error);
            });
          }, function (error) {
            console.error('Error sending email to client:', error);
          });
        }, function (error) {
          alert('There was an error sending your order. Please try again.');
          console.error('EmailJS error:', error);
        });
    });
  }

});
