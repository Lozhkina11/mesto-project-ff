const hideInputError = (element, inputErrorClass, errorClass, formElement) => {
  element.classList.remove(inputErrorClass);
  const errorElement = formElement.querySelector(`.${element.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const disableSubmitButton = (submitButton, inactiveButtonClass) => {
  submitButton.setAttribute("disabled", "disabled");
  submitButton.classList.add(inactiveButtonClass);
};

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
        hideInputError(input, inputErrorClass, errorClass, formElement);
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
        submitButton.classList.remove(inactiveButtonClass);
      } else {
        disableSubmitButton(submitButton, inactiveButtonClass);
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

export function clearValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formElements = document.querySelectorAll(formSelector);

  formElements.forEach((formElement) => {
    const formInputs = formElement.querySelectorAll(inputSelector);
    const submitButton = formElement.querySelector(submitButtonSelector);

    formInputs.forEach((input) => {
      hideInputError(input, inputErrorClass, errorClass, formElement);
    });
    disableSubmitButton(submitButton, inactiveButtonClass);
  });
}
