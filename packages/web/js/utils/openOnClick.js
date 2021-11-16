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

// Modal
const modalWrapper = document.querySelectorAll('.modalWrapper')
const openAcc = document.querySelector('.openAccordion')
const openAccPedidos = document.querySelector('.openAccordionPedidos')
const openAccGarantia = document.querySelector('.openAccordionGarantia')
const openAccEntregas = document.querySelector('.openAccordionEntregas')
const openAccPagamentos = document.querySelector('.openAccordionPagamentos')

const modalWrapperPedidos = document.querySelector('.modalWrapperPedidos')
const modalWrapperGarantia = document.querySelector('.modalWrapperGarantia')
const modalWrapperEntregas = document.querySelector('.modalWrapperEntregas')
const modalWrapperPagamentos = document.querySelector('.modalWrapperPagamentos')
const closeAcc = document.querySelectorAll('.closeAccordion')


openAccPedidos.addEventListener("click", function() {
  modalWrapperPedidos.classList.add("show");
})
openAccGarantia.addEventListener("click", function() {
  modalWrapperGarantia.classList.add("show");
})
openAccEntregas.addEventListener("click", function() {
  modalWrapperEntregas.classList.add("show");
})
openAccPagamentos.addEventListener("click", function() {
  modalWrapperPagamentos.classList.add("show");
})

closeAcc.forEach((closeAcc) =>{
  closeAcc.addEventListener('click', function(){
    modalWrapper.forEach((modalWrapper) => {
      modalWrapper.classList.remove('show')
    })
    
  }) 
  
}) 




