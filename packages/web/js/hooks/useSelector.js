export const useSelector = (selector) => {
  const isClass = !!selector.split(".")[1];
  const isID = !!selector.split("#")[1];

  if (!isClass && !isID) {
    console.log("theres no selector!!!!!");
    /* get the selector string and search for it in the DOM */

    const classSelectorElement = document.querySelector(`.${selector}`);
    const IDSelectorElement = document.querySelector(`#${selector}`);

    if (!!classSelectorElement) {
      console.log("found a class!!!");

      return classSelectorElement;
    }

    if (!!IDSelectorElement) {
      console.log("found an ID!!!");

      IDSelectorElement;
    }
  }

  return document.querySelector(selector);
};
