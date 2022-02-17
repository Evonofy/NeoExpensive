import { useSelector } from '../hooks/useSelector.js';

// Accordion
const accordions = useSelector('.accordion', {
  querySelectorAll: true,
});

accordions.forEach((accordion) => {
  accordion.onclick = () => {
    accordion.classList.toggle('active');

    var panel = accordion.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  };
});
