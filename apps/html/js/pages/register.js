import { useSelector } from '../hooks/useSelector.js';
import { useFetch } from '../hooks/useFetch.js';
import { useStorage } from '../hooks/useStorage.js';
import { useCookie } from '../hooks/useCookie.js';

import { redirect } from '../functions/redirect.js';
const isDev = true;

let page = 0;

/**
 * * dwadawdaw
 * TODO: aaaa
 * ? RENDER CYCLE
 * !show tab corresponding to page number
 * !listen to click on next button
 * !on button click, add 1 to page
 * !repeat
 * KEEP track of last page user was on
 */
const nextButton = document.querySelector('.register--button button');
const backButton = document.querySelector('.back--button');

const allInputs = Array.from(
  useSelector('input', {
    querySelectorAll: true,
  })
);

const user = {};

const inputsObj = allInputs.reduce((a, element) => {
  const inputName = element.parentElement.querySelector('label').innerHTML;

  /* remove spaces, lowercase, remove acentos */
  const formattedInputName = inputName
    .toString()
    /* lowercase all` */
    .toLowerCase()
    /* remove blank spaces and add `_` */
    .split(' ')
    .join('_')
    /* remove `(` & `)` */
    .split('(')
    .join('')
    .split(')')
    .join('')
    /* remove acentos */
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    /* change to english */
    .replace('_opcional', '')
    .replace('nome', 'name')
    .replace('confirme_a_senha', 'confirm_password')
    .replace('numero', 'number')
    .replace('data_de_nascimento', 'birth_date')
    .replace('complemento', 'complement')
    .replace('cpf', 'social_security')
    .replace('senha', 'password');

  return {
    ...a,
    [formattedInputName]: element,
  };
}, {});

const showTab = (tabNumber) => {
  hideAll();

  if (tabNumber === 0) {
    const { name, email, password, confirm_password } = inputsObj;

    showInput(name);
    showInput(email);
    showInput(password);
    showInput(confirm_password);
  } else if (tabNumber === 1) {
    const { social_security, birth_date } = inputsObj;

    showInput(social_security);
    showInput(birth_date);
  } else if (tabNumber >= 2) {
    const { complement, number, cep } = inputsObj;

    showInput(cep);
    showInput(complement);
    showInput(number);
  }
};

const hideAll = () => {
  allInputs.forEach((input) => {
    input.parentElement.style.display = 'none';
  });
};

const showInput = (input) => {
  input.parentElement.style.display = 'block';
};

const checkEmptyInput = (input) => {
  const isEmpty = input.value === '';

  if (isEmpty) {
    return true;
  }

  return false;
};

$('input[name="social-security"]').inputmask({
  mask: ['999.999.999-99'],
  keepStatic: true,
});

$('input[name="postal-code"]').inputmask({
  mask: ['99999-999'],
  keepStatic: true,
});

const handleSubmit = async () => {
  const { name, email, password } = inputsObj;

  const apiURL = isDev
    ? 'http://localhost:3333'
    : 'https://neo-expensive-api.herokuapp.com';

  try {
    const reponse = await fetch(`${apiURL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await reponse.json();

    console.log(data);
    const { user, access_token, refresh_token, error } = data;
    if (error === 'User already exists.') {
      alert('Usuário com esse e-mail já existe :(');
    }
    localStorage.setItem('@neo:access', access_token);
    localStorage.setItem('@neo:refresh', refresh_token);
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: user.id,
        name: user.props.name,
        email: user.props.email,
        createdAt: user.props.createdAt,
        updatedAt: user.props.updatedAt,
      })
    );

    setTimeout(() => {
      window.location.href = `${window.location.origin}/old`;
      // redirect('/');
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

if (page === 0) {
  backButton.style.display = 'none';
}
console.log(inputsObj);

nextButton.addEventListener('click', async () => {
  let canProceeed = true;

  /* prevent skip without filling input */
  if (page === 0) {
    const { name, email, password, confirm_password } = inputsObj;

    const isNameEmpty = checkEmptyInput(name);
    const isEmailEmpty = checkEmptyInput(email);
    const isPasswordEmpty = checkEmptyInput(password);
    const isConfirmPasswordEmpty = checkEmptyInput(confirm_password);

    if (
      isNameEmpty ||
      isEmailEmpty ||
      isPasswordEmpty ||
      isConfirmPasswordEmpty
    ) {
      alert('Preeencha o formulário');
      /* inputs are emtpy */
      canProceeed = false;
    }

    /* check if passwords match */
    const passwordMatch = password.value === confirm_password.value;

    if (!passwordMatch) {
      /* passwords do not match */
      alert('As senhas não são iguais');

      canProceeed = false;
    }
  }

  if (page === 1) {
    const { social_security, birth_date } = inputsObj;

    const isSocialSecurityEmpty = checkEmptyInput(social_security);
    const isBirthDateEmpty = checkEmptyInput(birth_date);

    if (isSocialSecurityEmpty || isBirthDateEmpty) {
      alert('As senhas não são iguais');
      /* inputs are empty */
      canProceeed = false;
    }

    /* call the api to verify the CPF and Birth Date */
  }

  if (page === 2) {
    const { cep, number } = inputsObj;
    const isCEPEmpty = checkEmptyInput(cep);
    const isNumberEmpty = checkEmptyInput(number);

    if (isCEPEmpty || isNumberEmpty) {
      alert('Preecha o formulário');
      /* inputs are empty */
      canProceeed = false;
      return;
    }

    /* make the fetch request */
    await handleSubmit();
  }

  if (canProceeed) {
    page += 1;
  }

  showTab(page);
});

showTab(page);
