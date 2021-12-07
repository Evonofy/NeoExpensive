import { redirect } from '../functions/redirect.js';
import { useFetch } from '../hooks/useFetch.js';
import { useSelector } from '../hooks/useSelector.js';

const productCardGrid = useSelector('.catalogue--product--grid');
const select = useSelector('.catalogue--select');

const urlItemName = location.search.split('?=')[1];

const addToCart = async () => {
  /* call the cart api */
};

/* fetch the api and get all the items with similar name */
(async () => {
  const { data } = await useFetch.get(`/item?name=${urlItemName}`);

  /* render the items on screen */
  let { items } = data;

  let sortedItems = items.sort((a, b) =>
    a.rating.average > b.rating.average ? -1 : 1
  );
  select.onchange = (event) => {
    const option = event.target.value;

    switch (option) {
      case 'leastpriced':
        sortedItems = items.sort((a, b) =>
          a.price.cash > b.price.cash ? 1 : -1
        );
        break;
      case 'mostpriced':
        sortedItems = items.sort((a, b) =>
          a.price.cash > b.price.cash ? -1 : 1
        );
        break;
      case 'bestreviewed':
        sortedItems = items.sort((a, b) =>
          a.rating.average > b.rating.average ? -1 : 1
        );
        break;
      default:
        sortedItems = items.sort((a, b) =>
          a.rating.average > b.rating.average ? -1 : 1
        );
        break;
    }
  };

  sortedItems.forEach((item) => {
    const slug = item.name.split(' ').join('-');

    const productCard = document.createElement('div');
    productCard.classList.add('product--card');

    const card = `
       <a
        class="product--card--image"
         href="${redirect(`/pages/product-template/?=${slug}`, {
           returnPathOnly: true,
         })}"
       >
         <img src="../../images/pages/main/products/fonte.webp" />
       </a>

       <div class="product--card--desc">
         <h2 class="product--card--title">${item.name}</h2>

         <a
           class="product--category"
           href="${redirect(`/pages/category/?=${item.category}`, {
             returnPathOnly: true,
           })}"
           >
           ${item.description.category}
         </a>

         <p class="product--card--paragraph">R$ ${item.price.cash}</p>

         <div class="product--card--button--wrapper">
            <a 
              class="product--card--buy" 
              href="${redirect(`/pages/checkout/?=${slug}`, {
                returnPathOnly: true,
              })}"
            >
              <img src="../../images/pages/main/products/receipt.svg" alt="" class="product--card--label">
              Comprar
            </a>

           <a
            class="product--card--cart"
            href="${addToCart(item.id)}"
            >
             <img src="../../images/components/header/user-controls/shopping-cart.svg" alt="" class="product--card--label">
           </a>
         </div>
       </div>
     `;

    productCard.innerHTML = card;

    productCardGrid.appendChild(productCard);
  });
})();
