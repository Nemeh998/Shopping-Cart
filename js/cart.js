/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

let cart;
let tbody = document.getElementsByTagName(tbody);


function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {

  var cartTBodyEls = document.getElementById('cart').getElementsByTagName('tbody');
  for (var tBodyEl of cartTBodyEls) {
    while (tBodyEl.firstChild) {
      tBodyEl.removeChild(tBodyEl.firstChild);
    }
  }
}



// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var cartTBodyEls = document.getElementById('cart').getElementsByTagName('tbody');
  for (var i = 0; i < 1; i++) {
    var cartTBodyEl = cartTBodyEls[i];
    // TODO: Iterate over the items in the cart
    for (var j = 0; j < cart.items.length; j++) {
      // TODO: Create a TR
      var newRowEl = document.createElement('tr');
      // TODO: Create a TD for the delete link, quantity,  and the item
      //delete link
      var deleteTDEl = document.createElement('td');
      deleteTDEl.setAttribute('id', cart.items[j].product);
      var anchorEl = document.createElement('a');
      anchorEl.setAttribute('href', '#delete-link');
      anchorEl.setAttribute('id', cart.items[j].product);
      anchorEl.addEventListener('click', removeItemFromCart);
      anchorEl.innerText = 'X';
      deleteTDEl.appendChild(anchorEl);
      newRowEl.appendChild(deleteTDEl);
      //qty td
      var qtyTDEl = document.createElement('td');
      qtyTDEl.innerText = cart.items[j].quantity;
      newRowEl.appendChild(qtyTDEl);
      //item
      var itemTDEl = document.createElement('td');
      itemTDEl.innerText = cart.items[j].product;
      newRowEl.appendChild(itemTDEl);
      // TODO: Add the TR to the TBODY and each of the TD's to the TR
      cartTBodyEl.appendChild(newRowEl);
    }
  }
}
function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  var itemToRemove = event.target.id;
  for (var i = 0; i < cart.items.length; i++)
  {
    if (cart.items[i].product === itemToRemove)
    {
      cart.removeItem(cart.items[i]);
    }
  }
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();