// ===== Menu mobile =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

// ===== Carrinho =====
const cartCountEl = document.getElementById('cartCount');
let cartCount = Number(localStorage.getItem('cartCount') || 0);
cartCountEl.textContent = cartCount;

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    cartCountEl.textContent = cartCount;
    btn.textContent = 'Adicionado';
    setTimeout(() => btn.textContent = 'Adicionar', 900);
  });
});

// ===== Modal de Produto =====
const modal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const frontImage = document.getElementById('frontImage');
const backImage = document.getElementById('backImage');

document.querySelectorAll('.view-product').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = btn.closest('.card');
    const title = card.querySelector('h4').textContent;
    const price = card.querySelector('.price').textContent;
    const imgSrc = card.querySelector('img').src;

    productTitle.textContent = title;
    productPrice.textContent = price;
    frontImage.src = imgSrc;
    backImage.src = imgSrc + '?grayscale'; // simulação do verso

    modal.style.display = 'flex';
  });
});

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});
