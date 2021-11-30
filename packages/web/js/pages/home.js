import { useFetch } from '../hooks/useFetch.js';
import { useSelector } from '../hooks/useSelector.js';

(async () => {
  const { data } = await useFetch('/item');
  console.log(data);

  const mainProductsSection = useSelector('.main--products');
  /* get one item of each category and put it in this section */
  /* get the most rated/popular items */

  const itemSearch = useSelector('#item--seach--input');
  itemSearch.oninput = (event) => {
    const typedText = event.target.value;

    /* CALL THE SEARCH API HERE */
    console.log(typedText);
  };

  const mainOffers = useSelector('.main--offers');
  /* get all the items and put them in here ^
                                            |
  */
})();
