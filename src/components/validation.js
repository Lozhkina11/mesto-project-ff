export default function FormValidator(validationConfig, formElement) {
  const formInputs = formElement.querySelectorAll(".popup__input");
  const submitButton = formElement.querySelector(".popup__button");

  const showInputError = (element, validationMessage) => {
    element.classList.add("popup__error");
    const errorElement = formElement.querySelector(`.${element.id}-error`);
    errorElement.classList.add("popup__error_active");
    errorElement.textContent = validationMessage;
  };

  const hideInputError = (element) => {
    element.classList.remove("popup__error");
    const errorElement = formElement.querySelector(`.${element.id}-error`);
    errorElement.classList.remove("popup__error_active");
    errorElement.textContent = "";
  };

  const isValid = (input) => {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.getAttribute('data-pattern-message'));
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

  const clearValidation = () => {
    formInputs.forEach((input) => {
      hideInputError(input);
    });
    submitButton.setAttribute("disabled", "disabled");
  };

  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(input);
      toggleSubmitButton();
    });
  });
return clearValidation (formElement);
}

export function clearValidation(formElement) {
  const formInputs = formElement.querySelectorAll(".popup__input");
  const submitButton = formElement.querySelector(".popup__button");

  const hideInputError = (element) => {
    element.classList.remove("popup__error");
    const errorElement = formElement.querySelector(`.${element.id}-error`);
    errorElement.classList.remove("popup__error_active");
    errorElement.textContent = "";
  };

  const clearValidation = () => {
    formInputs.forEach((input) => {
      hideInputError(input);
    });
    submitButton.setAttribute("disabled", "disabled");
  };

  clearValidation(formElement);

  return clearValidation;
}


