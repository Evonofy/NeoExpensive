let step = 0;

const $ = document.querySelector.bind(document);

const submitButton = $('.register--button--link');
const form = $('form');

form.onsubmit = event => {
  event.preventDefault();
};

/* name, email, password */
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
      console.log('step 2');
      break;
    /* cpf */
    /* data de nascimento */

    case 2:
      console.log('step 3');
      break;
    /* cep, numero, complemento */
    /* bairro, uf, rua */
  }
});
