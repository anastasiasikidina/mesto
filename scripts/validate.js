const hasinvalidInput = (inputlist) => {
    return inputlist.some(inputElement => !inputElement.validity.valid);
  }
  
  const toggleButtonState = (inputlist, buttonElement, validationCheck) => {
    if (hasinvalidInput(inputlist)) {
      buttonElement.classList.add(validationCheck.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(validationCheck.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };
  
  const showInputError = (formElement, inputElement, validationCheck) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationCheck.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validationCheck.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, validationCheck) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationCheck.inputErrorClass);
    errorElement.classList.remove(validationCheck.errorClass)
  };
  
  const checkInput = (formElement, inputElement, validationCheck) => {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, validationCheck);
    } else {
      showInputError(formElement, inputElement, validationCheck);
    }
  };
  
  const setInputListners = (formElement, validationCheck) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    const inputList = Array.from(formElement.querySelectorAll(validationCheck.inputSelector));
    const buttonElement = formElement.querySelector(validationCheck.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (event) => {
          checkInput(formElement, inputElement, validationCheck);
          toggleButtonState(inputList, buttonElement, validationCheck);
        });
      });
    toggleButtonState(inputList, buttonElement, validationCheck);
  }; 
  
  const enableValidation = (validationCheck) => {
    const formElements = document.querySelectorAll(validationCheck.formSelector);
    const formList = Array.from(formElements);
    formList.forEach((formElement) => {
      setInputListners(formElement, validationCheck);
    });
  };
  
    enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__form-message-error_active'
  });
  