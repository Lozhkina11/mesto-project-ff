export const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formElements = document.querySelectorAll(formSelector); 

  formElements.forEach((formElement) => {
    const formInputs = formElement.querySelectorAll(inputSelector); 
    const submitButton = formElement.querySelector(submitButtonSelector); 

    const showInputError = (element, validationMessage) => {
      element.classList.add(inputErrorClass); 
      const errorElement = formElement.querySelector(`.${element.id}-error`);
      errorElement.classList.add(errorClass); 
      errorElement.textContent = validationMessage;
    };

    const hideInputError = (element) => {
      element.classList.remove(inputErrorClass);
      const errorElement = formElement.querySelector(`.${element.id}-error`);
      errorElement.classList.remove(errorClass);
      errorElement.textContent = "";
      // element.setCustomValidity("");
    };
    const isValid = (input) => {
      if (input.validity.patternMismatch) {
        input.setCustomValidity(input.getAttribute("data-pattern-message"));
      } else {
        input.setCustomValidity("");
      }

      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
        return false;
      } else {
        hideInputError(input);
        return true;
      }
    };

    const toggleSubmitButton = () => {
      let allInputsValid = true;

      formInputs.forEach((input) => {
        if (!isValid(input)) {
          allInputsValid = false;
        }
      });

      if (allInputsValid) {
        // submitButton.removeAttribute("disabled")
        submitButton.classList.remove(inactiveButtonClass); // "popup__button_disabled"
      } 
      else {
        // submitButton.setAttribute("disabled", "disabled");
        submitButton.classList.add(inactiveButtonClass); //"popup__button_disabled"
      }
    };

    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        isValid(input);
        toggleSubmitButton();
      });
    });
  });
};

export function clearValidation(formElement) {
  const formInputs = formElement.querySelectorAll(".popup__input"); // есть
  const submitButton = formElement.querySelector(".popup__button"); // есть

  const hideInputError = (element) => {
    element.classList.remove("popup__input_type_error");
    const errorElement = formElement.querySelector(`.${element.id}-error`);
    errorElement.classList.remove("popup__error_visible");
    errorElement.textContent = "";
  };

  const clearValidationFunc = () => {
    formInputs.forEach((input) => {
      hideInputError(input);
    });
    submitButton.classList.add("popup__button_disabled")
  };

  clearValidationFunc(formElement);

  return clearValidationFunc;
}
