const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 }
];

let cart = [];

function displayCatalog() {
  const catalog = document.querySelector('.catalog');
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `${p.name} - $${p.price} <button onclick="addToCart(${p.id})">Add</button>`;
    catalog.appendChild(div);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartDiv = document.querySelector('.cart-items');
  const total = document.getElementById('total');
  cartDiv.innerHTML = "";
  let sum = 0;
  cart.forEach(i => {
    cartDiv.innerHTML += `<p>${i.name} - $${i.price}</p>`;
    sum += i.price;
  });
  total.textContent = sum;
}

function checkout() {
  alert("Thanks for shopping!");
  cart = [];
  updateCart();
}

window.onload = displayCatalog;
