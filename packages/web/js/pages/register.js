import { useSelector } from '../hooks/useSelector.js';

let step = 0;

const form = useSelector('.register--form');

const inputPrefix = (name) => `.register--form--input[name="${name}"]`;

const allInputs = useSelector('input', {
  querySelectorAll: true,
  tagSelection: true,
});
const nameInput = useSelector(inputPrefix('name'));
const emailInput = useSelector(inputPrefix('email'));
const passwordInput = useSelector(inputPrefix('name'));
const passwordConfirmInput = useSelector(inputPrefix('confirm--password'));
const socialSecurityInput = useSelector(inputPrefix('social--security'));
const birthDateInput = useSelector(inputPrefix('birth--date'));
const postalCodeInput = useSelector(inputPrefix('postal--code'));
const numberInput = useSelector(inputPrefix('number'));
const complementInput = useSelector(inputPrefix('complement'));

const submitButton = useSelector('.register--button--link');

const hideAll = () => {
  allInputs.forEach((input) => {
    input.parentElement.style.display = 'none';
  });
};

const showInput = (input) => {
  console.log(input);
  input.parentElement.style.display = 'block';
};

form.onsubmit = (event) => {
  event.preventDefault();
};

/* name, email, password */
hideAll();

showInput(nameInput);
showInput(emailInput);
showInput(passwordInput);
showInput(passwordConfirmInput);

console.log('step 1');
submitButton.addEventListener('click', () => {
  if (step === 2) {
    step = 2;
  } else {
    step += 1;
  }

  console.log(step);

  switch (step) {
    case 1:
      hideAll();

      showInput(socialSecurityInput);
      showInput(birthDateInput);

      console.log('step 2');
      break;
    /* cpf */
    /* data de nascimento */

    case 2:
      hideAll();

      showInput(postalCodeInput);
      showInput(numberInput);
      showInput(complementInput);

      console.log('step 3');
      break;
    /* cep, numero, complemento */
    /* bairro, uf, rua */
  }
});
