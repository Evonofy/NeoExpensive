const navToggle = document.querySelector('.hamburger--header--button');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav--open');
});