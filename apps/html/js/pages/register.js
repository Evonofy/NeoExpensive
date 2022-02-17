import { useSelector } from '../hooks/useSelector.js';
import { useFetch } from '../hooks/useFetch.js';
import { useStorage } from '../hooks/useStorage.js';
import { useCookie } from '../hooks/useCookie.js';

import { redirect } from '../functions/redirect.js';

var page = 0;

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
const nextButton = useSelector('.register--button--link');

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

$('input[name="social--security"]').inputmask({
  mask: ['999.999.999-99'],
  keepStatic: true,
});

$('input[name="postal--code"]').inputmask({
  mask: ['99999-999'],
  keepStatic: true,
});

const handleSubmit = async () => {
  const { name, email, password, social_security, birth_date } = inputsObj;

  return await useFetch.post('/user', {
    name: name.value,
    email: email.value,
    password: password.value,
    cpf: social_security.value.split('-').join('').split('.').join(''),
    birthDate: new Date(birth_date.value).toISOString(),
    isAdmin: false,
  });
};

nextButton.onclick = async () => {
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
      /* inputs are emtpy */
      canProceeed = false;
    }

    /* check if passwords match */
    const passwordMatch = password.value === confirm_password.value;

    if (!passwordMatch) {
      /* passwords do not match */
      canProceeed = false;
    }
  }

  if (page === 1) {
    const { social_security, birth_date } = inputsObj;

    const isSocialSecurityEmpty = checkEmptyInput(social_security);
    const isBirthDateEmpty = checkEmptyInput(birth_date);

    if (isSocialSecurityEmpty || isBirthDateEmpty) {
      /* inputs are empty */
      canProceeed = false;
    }

    /* call the api to verify the CPF and Birth Date */
  }

  if (page === 2) {
    console.log('fetch');
    canProceeed = false;
    /* make the fetch request */
    const { data, error } = await handleSubmit();

    const { activate_token } = data;

    if (error) {
      if (window.confirm('Um erro ocorreu :/, por favor tente novamente')) {
        window.location.reload();
      }
    }

    // activate user
    const {
      data: { accessToken },
    } = await useFetch.post(
      '/user/activate',
      {},
      {
        headers: {
          authorization: `Bearer ${activate_token}`,
        },
      }
    );

    const token = `Bearer ${accessToken}`;

    useStorage('neoexpensive.token', token);
    useCookie('neoexpensive.token', token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // /* redirect to homepage logged in */
    setTimeout(() => {
      window.location.href =
        'https://esquemaflorescer.github.io/neo-expensive/packages/web';
      // redirect('/');
    }, 500);
  }

  if (canProceeed) {
    page += 1;
  }

  showTab(page);
};

showTab(page);
