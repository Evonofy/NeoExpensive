/**
 * TODO: Identify querySelectorAll automatically
 */
export const useSelector = (
  selector,
  { querySelectorAll = false, tagSelection = false } = {}
) => {
  const $ = !querySelectorAll
    ? document.querySelector.bind(document)
    : document.querySelectorAll.bind(document);

  const isClass = !!selector.split('.')[1];
  const isID = !!selector.split('#')[1];

  if (!isClass && !isID && tagSelection === false) {
    console.log(
      `[WARNING:useSelector] -> the selector ${selector} doesn't exist`
    );
    /* get the selector string and search for it in the DOM */

    const classSelectorElement = $(`.${selector}`);
    const IDSelectorElement = $(`#${selector}`);

    if (!!classSelectorElement) {
      console.log('found a class!!!');

      return classSelectorElement;
    }

    if (!!IDSelectorElement) {
      console.log('found an ID!!!');

      IDSelectorElement;
    }
  }

  return $(selector);
};
