const purchaseHistory = document.querySelector('.purchaseHistory');
const reviewHistory = document.querySelector('.reviewHistory');
const purchaseWrapper = document.querySelector('.purchaseWrapper');
const reviewWrapper = document.querySelector('.reviewWrapper');

purchaseHistory.addEventListener('click', () => {
  purchaseWrapper.style.display = 'flex';
  reviewWrapper.style.display = 'none';
});

reviewHistory.addEventListener('click', () => {
  reviewWrapper.style.display = 'flex';
  purchaseWrapper.style.display = 'none';
});
