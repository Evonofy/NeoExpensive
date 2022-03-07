const cardPayment = document.querySelector('.checkoutCard');
const pixPayment = document.querySelector('.checkoutPix');
const divCard = document.querySelector('.checkoutDivCard');
const divPix = document.querySelector('.checkoutDivPix');

cardPayment.addEventListener('click', () => {
  divCard.style.display = 'flex';
  divPix.style.display = 'none';
});

pixPayment.addEventListener('click', () => {
  divPix.style.display = 'flex';
  divCard.style.display = 'none';
});
