import { useSelector } from '../hooks/useSelector.js';

const navToggle = useSelector('.hamburger--header--button');

navToggle.onclick = () => {
  document.body.classList.toggle('nav--open');
};
