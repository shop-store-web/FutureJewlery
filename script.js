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
  
});
