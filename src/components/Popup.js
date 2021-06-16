export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (evt.key === 'Escape') {
            this.close(this._popupElement);
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                this.close(this._popupElement)
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.close(this._popupElement);
            }
        })
    }
}
