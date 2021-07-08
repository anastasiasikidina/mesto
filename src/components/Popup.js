export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this.handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener("keydown", this.handleEscClose);
    this.popupElement.classList.add("popup_opened");
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.popupElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (e.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this.handleEscClose);
  }
}

