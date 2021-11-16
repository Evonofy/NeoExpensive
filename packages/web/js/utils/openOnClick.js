const navToggle = document.querySelector('.hamburger--header--button');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav--open');
});

// Accordion
const accordions = document.querySelectorAll(".accordion")

accordions.forEach(accordion => {
  accordion.addEventListener("click", function() {
     this.classList.toggle("active");
     var panel = this.nextElementSibling;
     if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
     } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  })
})