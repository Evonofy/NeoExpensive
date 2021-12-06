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

  /* check if element acctually exists */
  const elementExists = $(selector);

  if (!elementExists) {
    console.log(`[useSelector:ERROR] -> element ${selector} doesn't exist`);
    return false;
  }

  const isClass = !!selector.split('.')[1];
  const isID = !!selector.split('#')[1];

  if (!isClass && !isID && tagSelection === false) {
    /* check for pure tags */
    const isPureTag = $(selector);

    if (isPureTag) {
      console.log(`[useSelector] -> ${selector} is a pure tag.`);
      return isPureTag;
    }

    console.log(
      `[useSelector:WARNING] -> the selector ${selector} doesn't exist`
    );
    /* get the selector string and search for it in the DOM */

    const classSelectorElement = $(`.${selector}`);
    const IDSelectorElement = $(`#${selector}`);

    if (!!classSelectorElement) {
      console.log('[useSelector] -> found a class for this selector');

      return classSelectorElement;
    }

    if (!!IDSelectorElement) {
      console.log('[useSelector] -> found an ID for this selector');

      return IDSelectorElement;
    }
  }

  return $(selector);
};
