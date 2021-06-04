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

  disableButtonSubmit() {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
