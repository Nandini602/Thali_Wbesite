

const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.getElementById('cart-total');

let cart = [];


document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    
    const menuItem = event.target.closest('.menu-item');

   
    const itemId = menuItem.dataset.id;
    const itemName = menuItem.dataset.name;
    const itemPrice = parseFloat(menuItem.dataset.price);

   
    const existingItem = cart.find(item => item.id === itemId);
    if (existingItem) {
     
      existingItem.quantity++;
    } else {
     
      cart.push({
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: 1
      });
    }

    
    updateCart();
  });
});


function updateCart() {
  
  cartItemsContainer.innerHTML = '';

  
  let total = 0;

  
  cart.forEach(item => {
    total += item.price * item.quantity;

    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>₹${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-item-btn" data-id="${item.id}">Remove</button>
    `;

    
    cartItemElement.querySelector('.remove-item-btn').addEventListener('click', () => {
      removeFromCart(item.id);
    });

    
    cartItemsContainer.appendChild(cartItemElement);
  });

  
  cartTotalElement.textContent = total.toFixed(2);
}


function removeFromCart(itemId) {
 
  cart = cart.filter(item => item.id !== itemId);

  
  updateCart();
}


document.getElementById('checkout').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }


  alert('Thank you for your purchase!');
  cart = []; 
  updateCart(); 
});
