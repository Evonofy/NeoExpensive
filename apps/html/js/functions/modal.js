import { useSelector } from '../hooks/useSelector.js';

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
