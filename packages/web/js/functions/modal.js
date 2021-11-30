import { useSelector } from '../hooks/useSelector.js';

const modalWrapper = document.querySelectorAll('.modalWrapper');
const openAcc = document.querySelector('.openAccordion');
const openAccPedidos = document.querySelector('.openAccordionPedidos');
const openAccGarantia = document.querySelector('.openAccordionGarantia');
const openAccEntregas = document.querySelector('.openAccordionEntregas');
const openAccPagamentos = document.querySelector('.openAccordionPagamentos');

const modalWrapperPedidos = document.querySelector('.modalWrapperPedidos');
const modalWrapperGarantia = document.querySelector('.modalWrapperGarantia');
const modalWrapperEntregas = document.querySelector('.modalWrapperEntregas');
const modalWrapperPagamentos = document.querySelector(
  '.modalWrapperPagamentos'
);
const closeAcc = document.querySelectorAll('.closeAccordion');

openAccPedidos.addEventListener('click', function () {
  modalWrapperPedidos.classList.add('show');
});
openAccGarantia.addEventListener('click', function () {
  modalWrapperGarantia.classList.add('show');
});
openAccEntregas.addEventListener('click', function () {
  modalWrapperEntregas.classList.add('show');
});
openAccPagamentos.addEventListener('click', function () {
  modalWrapperPagamentos.classList.add('show');
});

closeAcc.forEach((closeAcc) => {
  closeAcc.addEventListener('click', function () {
    modalWrapper.forEach((modalWrapper) => {
      modalWrapper.classList.remove('show');
    });
  });
});
