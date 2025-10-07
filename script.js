// ===== Menu mobile =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

// ===== Modal de Produto =====
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const frontImage = document.getElementById('frontImage');
const backImage = document.getElementById('backImage');
const buyButton = document.getElementById('buyButton');

document.querySelectorAll('.view-product').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const card = btn.closest('.card');
    const title = card.querySelector('h4').textContent;
    const price = parseFloat(card.querySelector('.price').textContent.replace('R$', '').replace(',', '.'));
    const imgSrc = card.querySelector('img').src;

    productTitle.textContent = title;
    productPrice.textContent = `R$ ${price.toFixed(2)}`;
    frontImage.src = imgSrc;
    backImage.src = imgSrc + '?grayscale';

    // Adicionar item do modal ao carrinho
    buyButton.onclick = () => {
      addToCart({ title, price, img: imgSrc });
      productModal.style.display = 'none';
    };

    productModal.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => productModal.style.display = 'none');
window.addEventListener('click', e => { if(e.target === productModal) productModal.style.display = 'none'; });

// ===== Carrinho =====
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartCountEl = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCart();

cartBtn.addEventListener('click', () => cartModal.style.display = 'flex');
closeCart.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', e => { if(e.target === cartModal) cartModal.style.display = 'none'; });

// ===== Adicionar itens =====
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const title = card.querySelector('h4').textContent;
    const price = parseFloat(card.querySelector('.price').textContent.replace('R$', '').replace(',', '.'));
    const img = card.querySelector('img').src;

    addToCart({ title, price, img });

    btn.textContent = 'Adicionado';
    setTimeout(() => btn.textContent = 'Adicionar', 900);
  });
});

// ===== Função genérica para adicionar =====
function addToCart(item){
  const existing = cart.find(i => i.title === item.title);
  if(existing){
    existing.quantity += 1;
  } else {
    cart.push({...item, quantity: 1});
  }
  updateCart();
}

// ===== Atualizar carrinho =====
function updateCart(){
  localStorage.setItem('cart', JSON.stringify(cart));

  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <span>${item.title} - R$ ${item.price.toFixed(2)} x ${item.quantity}</span>
      <div>
        <button onclick="decreaseQuantity(${index})">-</button>
        <button onclick="increaseQuantity(${index})">+</button>
        <button onclick="removeFromCart(${index})">Remover</button>
      </div>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotal.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2)}`;
}

// ===== Aumentar/Diminuir quantidade =====
function increaseQuantity(index){
  cart[index].quantity += 1;
  updateCart();
}

function decreaseQuantity(index){
  if(cart[index].quantity > 1){
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // remove se quantidade for 1
  }
  updateCart();
}

// ===== Remover item do carrinho =====
function removeFromCart(index){
  cart.splice(index, 1);
  updateCart();
}
