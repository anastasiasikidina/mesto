export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (evt.key === 'Escape') {
            this.close(this._popup);
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                this.close(this._popup)
            }
        })
    }
}
