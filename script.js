// Menu mobile
document.getElementById('hamburger').addEventListener('click', function(){
  document.getElementById('mainNav').classList.toggle('open');
});

// Carrinho simples
const cartCountEl = document.getElementById('cartCount');
let cartCount = Number(localStorage.getItem('cartCount') || 0);
cartCountEl.textContent = cartCount;

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount += 1;
    localStorage.setItem('cartCount', cartCount);
    cartCountEl.textContent = cartCount;
    btn.textContent = 'Adicionado';
    setTimeout(() => btn.textContent = 'Adicionar', 900);
  });
});
