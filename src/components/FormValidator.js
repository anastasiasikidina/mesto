/*export default class FormValidator {
  constructor(config, formElement) {
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._formElement = formElement 
  }

  // Показывает ошибку при валидации
  _showInputError(inputElement, errorMessage) {
      inputElement.classList.add(this._inputErrorClass);
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
      errorElement.textContent = errorMessage
      errorElement.classList.add(this._errorClass)
  }

  // Скрывает ошибку при валидации
  _hideInputError(inputElement) {
      inputElement.classList.remove(this._inputErrorClass)
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
      errorElement.textContent = ''
      errorElement.classList.remove(this._errorClass)
  }

  // Проверяет валидность полей
  _checkInputValidity(inputElement) {
      const isInputValid = inputElement.validity.valid;
      if (!isInputValid) {
          const errorMessage = inputElement.validationMessage
          this._showInputError(inputElement, errorMessage)
      } else {
          this._hideInputError(inputElement)
      }
  }

  resetValidation() {
      this._inputList.forEach(inputElement => {
          this._hideInputError(inputElement)
      })
      this._disableButtonSubmit()
  }

  _changeButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButtonSubmit();
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _disableButtonSubmit() {
      const hasNotValidInput = this._inputList.some(inputElement => !inputElement.validity.valid)
      if (hasNotValidInput) {
          this._buttonElement.setAttribute('disabled', true)
      } else {
          this._buttonElement.removeAttribute('disabled')
      }
     }

  _setEventListeners() {
      this._formElement.addEventListener('submit', (event) => {
          event.preventDefault()
      });
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
      this._inputList.forEach(inputElement => {
          inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement)
              this._disableButtonSubmit()
          })
      })
      this._disableButtonSubmit()
  }

  enableValidation() {
      this._setEventListeners()
  }
}*/
export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const _errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    _errorElement.classList.add(this._config.inputErrorClass);
    _errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const _errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    _errorElement.textContent = "";
    _errorElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _changeButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButtonSubmit();
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    this._changeButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._changeButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach(inputElement => {
        this._hideInputError(inputElement)
    })
    this.disableButtonSubmit()
}

  disableButtonSubmit() {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
