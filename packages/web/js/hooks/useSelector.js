export const useSelector = (selector, all) => {
  const $ = !all
    ? document.querySelector.bind(document)
    : document.querySelectorAll.bind(document);

  const isClass = !!selector.split(".")[1];
  const isID = !!selector.split("#")[1];

  if (!isClass && !isID) {
    console.log("theres no selector!!!!!");
    /* get the selector string and search for it in the DOM */

    const classSelectorElement = $(`.${selector}`);
    const IDSelectorElement = $(`#${selector}`);

    if (!!classSelectorElement) {
      console.log("found a class!!!");

      return classSelectorElement;
    }

    if (!!IDSelectorElement) {
      console.log("found an ID!!!");

      IDSelectorElement;
    }
  }

  return $(selector);
};
