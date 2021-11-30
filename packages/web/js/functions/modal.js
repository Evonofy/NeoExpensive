import { useSelector } from '../hooks/useSelector.js';

// class Modal {
//   openModalButtons = useSelector('.support--card--button', {
//     querySelectorAll: true,
//   });
//   modal;
//   closeModalButtons = useSelector('.closeAccordion', {
//     querySelectorAll: true,
//   });

//   window = window;
//   overlay = useSelector('.overlay');

//   constructor() {
//     this.openModalButtons.forEach((button) => {
//       this.modal = button.nextElementSibling;
//       this.onClick(button, () => this.showModal(this.modal));
//     });

//     this.closeModalButtons.forEach((button) => {
//       this.onClick(button, () =>
//         this.hideModal(button.parentElement.parentElement)
//       );
//     });

//     setTimeout(() => {
//       this.window.onclick = ({ target }) => {
//         if (
//           target !== this.modal ||
//           target !== this.modal.querySelector('article')
//         ) {
//           this.hideModal(this.modal);
//           this.window.removeEventListener('click', () => {});
//         }
//       };
//     }, 1000);
//   }

//   onClick = (element, callback) => {
//     element.onclick = () => callback();
//   };

//   showModal(modal) {
//     this.overlay.style.display = 'block';
//     modal.classList.add('show');
//   }

//   hideModal(modal) {
//     this.overlay.style.display = 'none';
//     modal.classList.remove('show');
//   }
// }

// new Modal();
const allModalWrapperButtons = useSelector('.support--card--button', {
  querySelectorAll: true,
});

const closeModal = (modal, overlay, body) => {
  overlay.style.display = 'none';
  body.style.overflow = 'auto';
  modal.classList.remove('show');
};

allModalWrapperButtons.forEach((button) => {
  button.onclick = () => {
    const modal = button.nextElementSibling;
    const body = useSelector('body');
    const overlay = useSelector('.overlay');
    const closeButton = modal.querySelector('.closeAccordion');

    /* spawn overlay */
    console.log('show modal');
    overlay.style.display = 'block';
    body.style.overflow = 'hidden';
    modal.classList.add('show');

    /* close when close button clicked */
    closeButton.onclick = () => {
      closeModal(modal, overlay, body);
    };

    /* stop another modal from being opened */

    /* close when click anywhere on window */
    window.onclick = ({ target }) => {
      if (target == overlay) {
        /* hide modal */
        console.log('hide modal');
        closeModal(modal, overlay, body);
      }
    };
  };
});

// const modalWrapper = document.querySelectorAll('.modalWrapper');
// const openAcc = document.querySelector('.openAccordion');
// const openAccPedidos = document.querySelector('.openAccordionPedidos');
// const openAccGarantia = document.querySelector('.openAccordionGarantia');
// const openAccEntregas = document.querySelector('.openAccordionEntregas');
// const openAccPagamentos = document.querySelector('.openAccordionPagamentos');

// const modalWrapperPedidos = document.querySelector('.modalWrapperPedidos');
// const modalWrapperGarantia = document.querySelector('.modalWrapperGarantia');
// const modalWrapperEntregas = document.querySelector('.modalWrapperEntregas');
// const modalWrapperPagamentos = document.querySelector(
//   '.modalWrapperPagamentos'
// );
// const closeAcc = document.querySelectorAll('.closeAccordion');

// openAccPedidos.addEventListener('click', function () {
//   modalWrapperPedidos.classList.add('show');
// });
// openAccGarantia.addEventListener('click', function () {
//   modalWrapperGarantia.classList.add('show');
// });
// openAccEntregas.addEventListener('click', function () {
//   modalWrapperEntregas.classList.add('show');
// });
// openAccPagamentos.addEventListener('click', function () {
//   modalWrapperPagamentos.classList.add('show');
// });

// closeAcc.forEach((closeAcc) => {
//   closeAcc.addEventListener('click', function () {
//     modalWrapper.forEach((modalWrapper) => {
//       modalWrapper.classList.remove('show');
//     });
//   });
// });
