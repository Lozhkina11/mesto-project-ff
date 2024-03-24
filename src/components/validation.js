export const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formElements = document.querySelectorAll(formSelector); // '.popup__form'

  formElements.forEach((formElement) => {
    const formInputs = formElement.querySelectorAll(inputSelector); // '.popup__input'
    const submitButton = formElement.querySelector(submitButtonSelector); // '.popup__button'

    const showInputError = (element, validationMessage) => {
      element.classList.add(inputErrorClass); // 'popup__input_type_error'
      const errorElement = formElement.querySelector(`.${element.id}-error`);
      errorElement.classList.add(errorClass); // красный текст "popup__error_visible"
      errorElement.textContent = validationMessage;
    };

    const hideInputError = (element) => {
      element.classList.remove(inputErrorClass);
      const errorElement = formElement.querySelector(`.${element.id}-error`);
      errorElement.classList.remove(errorClass);
      errorElement.textContent = "";
      element.setCustomValidity("");
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
        submitButton.removeAttribute("disabled");
      } else {
        submitButton.setAttribute("disabled", "disabled");
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
    element.setCustomValidity("");
  };

  const clearValidationFunc = () => {
    formInputs.forEach((input) => {
      hideInputError(input);
    });
    submitButton.setAttribute("disabled", "disabled");
  };

  clearValidationFunc(formElement);

  return clearValidationFunc;
}
// export function clearValidation(formElement) {
//   const formInputs = formElement.querySelectorAll(".popup__input"); // есть
//   const submitButton = formElement.querySelector(".popup__button"); // нет
//   const hideInputError = (element) => {
//     element.classList.remove("popup__error");
//     const errorElement = formElement.querySelector(`.${element.id}-error`);
//     errorElement.classList.remove("popup__error_active");
//     errorElement.textContent = "";
//     element.setCustomValidity("");
//   };

//   const clearValidationFunc = () => {
//     formInputs.forEach((input) => {
//       hideInputError(input);
//     });
//     submitButton.setAttribute("disabled", "disabled");
//   };

//   clearValidationFunc(formElement);

//   return clearValidationFunc;
// }
