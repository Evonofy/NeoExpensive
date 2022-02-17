import { useSelector } from './useSelector.js';

export const useElementMap = (callback, buttons) => {
  const buttonCallback = (button) => {
    const triggerButtons = useSelector(button, {
      querySelectorAll: true,
    });

    triggerButtons.forEach((button) => {
      // prettier-ignore
      (() => {
        return callback(button)        
      })();
    });
  };

  if (!Array.isArray(buttons)) {
    buttonCallback(buttons);
  } else {
    buttons.forEach((button) => {
      buttonCallback(button);
    });
  }
};
