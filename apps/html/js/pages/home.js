function checkLogin() {
  const isLoggedIn = !!JSON.parse(localStorage.getItem('user'));

  if (!isLoggedIn) {
    const currentURL = window.location.href;
    window.location.href = `${currentURL}pages/login/index.html`;
    return;
  }

  console.log('go to cart');
}

function handleBuyButtonClick() {
  checkLogin();
}

function handleAddToCardButtonClick() {
  checkLogin();
}

async function loadProducts() {
  const products = await fetch('/js/data/products.json');
  const data = await products.json();

  const productsEntry = document.querySelector('.main--products');

  let productsList = '';

  data.map(({ id, name, price, tags, img }) => {
    let allTags = '';

    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    tags.forEach((tag) => {
      const formattedTag = tag
        .split('-')
        .map((word) => capitalizeFirstLetter(word))
        .join(' ');

      allTags += `
        <a href="#" class="product--category">
          ${formattedTag}
        </a>
      `;
    });

    // eslint-disable-next-line new-cap
    const realBRL = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    const formattedPrice = realBRL.format(price);

    productsList += `
      <div class="product--card">
        <a href="pages/product-template/index.html" class="product--card--image">
          <img src="${img}" alt="Imagem de ${name} com preço de ${price}">
        </a>

        <div class="product--card--desc">
          <h2 class="product--card--title">${name}</h2>
          ${allTags}
          <p class="product--card--paragraph">${formattedPrice}</p>

          <div class="product--card--button--wrapper">
            <button
              onclick="handleBuyButtonClick()"
              style="cursor: pointer;"
              data-id="${id}"
              class="product--card--buy"
            >
              <img src="./images/pages/main/products/receipt.svg" alt="" class="product--card--label">
              Comprar
            </button>

            <button
              onclick="handleAddToCardButtonClick()"
              style="cursor: pointer;"
              class="product--card--cart">
                <img src="./images/components/header/user-controls/shopping-cart.svg" alt="" class="product--card--label">
            </button>
          </div>
        </div>
      </div>
    `;
  });

  productsEntry.innerHTML = productsList;
}

async function loadBrands() {
  const brands = await fetch('/js/data/brands.json');
  const data = await brands.json();

  const brandsEntry = document.querySelector('.main--per--category');

  let brandsList = '';

  data.map((brand) => {
    brandsList += `
      <div class="main--category--card ${String(brand).toLowerCase()}">
        <a href="#" class="main--category--card--label amd--hover">
          <p class="main--category--card--label--text">${brand}</p>
        </a>
      </div>
    `;
  });

  brandsEntry.innerHTML = brandsList;
}

async function loadDepartments() {
  const departments = await fetch('/js/data/departments.json');
  const data = await departments.json();

  const departmentsEntry = document.querySelector('.main--per--department');

  let departmentsList = '';

  data.map(({ id, name }) => {
    departmentsList += `
      <div class="main--department--card ${String(id).toLowerCase()}--image">
        <a href="#" class="main--department--card--label">
          <p class="main--department--card--label--text">${name}</p>
        </a>
      </div>
    `;
  });

  departmentsEntry.innerHTML = departmentsList;
}

loadProducts();
loadBrands();
loadDepartments();

document.addEventListener('DOMContentLoaded', () => {
  const profileButtons = document.querySelectorAll('.profile-item');
  const loginButtons = document.querySelectorAll('.login-item');
  const registerButtons = document.querySelectorAll('.register-item');
  const logoutButtons = document.querySelectorAll('.logout-item');

  const isLoggedIn = !!JSON.parse(localStorage.getItem('user'));

  if (isLoggedIn) {
    logoutButtons.forEach((button) => (button.style.display = 'flex'));
    profileButtons.forEach((button) => (button.style.display = 'flex'));
    loginButtons.forEach((button) => (button.style.display = 'none'));
    registerButtons.forEach((button) => (button.style.display = 'none'));
  } else {
    logoutButtons.forEach((button) => (button.style.display = 'none'));
    profileButtons.forEach((button) => (button.style.display = 'none'));
    loginButtons.forEach((button) => (button.style.display = 'flex'));
    registerButtons.forEach((button) => (button.style.display = 'flex'));
  }

  logoutButtons.forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.removeItem('user');
      localStorage.removeItem('@neo:access');
      localStorage.removeItem('@neo:refresh');

      logoutButtons.forEach((button) => (button.style.display = 'none'));
      profileButtons.forEach((button) => (button.style.display = 'none'));
      loginButtons.forEach((button) => (button.style.display = 'flex'));
      registerButtons.forEach((button) => (button.style.display = 'flex'));
    });
  });
});
// import { useFetch } from '../hooks/useFetch.js';
// import { useSelector } from '../hooks/useSelector.js';

// (async () => {
//   const {} = await fetch('/');
//   const { data } = await useFetch('/item');
//   console.log(data);

//   const mainProductsSection = useSelector('.main--products');
//   /* get one item of each category and put it in this section */
//   /* get the most rated/popular items */

//   const itemSearch = useSelector('#item--seach--input');
//   itemSearch.oninput = (event) => {
//     const typedText = event.target.value;

//     /* CALL THE SEARCH API HERE */
//     console.log(typedText);
//   };

//   const mainOffers = useSelector('.main--offers');
//   /* get all the items and put them in here ^
//                                              |
//    */
// })();
