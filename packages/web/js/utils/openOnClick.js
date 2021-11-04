const navToggle = document.querySelector('.hamburger--header--button');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav--open');
});

var acc = document.getElementsByClassName("support--section--accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}