const ESC_KEYCODE = 27;
const handleEscUp = (evt, action) => {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.which === ESC_KEYCODE) {
    activePopup.classList.remove("popup_opened");
    document.removeEventListener("keyup", handleEscUp);
  }
};

const popupView = document.querySelector(".popup_view_foto");
const imageElement = popupView.querySelector(".popup__image");
const imageCaption = popupView.querySelector(".popup__caption");
export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);
    return cardElement;
  }
  // toggle кнопки like
  _likeCard(evt) {
    evt.target.classList.toggle("gallery__like-button_active");
  }
  //удаляем элемент
  _deleteCard() {
    this._element.remove();
  }

  _handleCardClick() {
    imageElement.src = this._link;
    imageCaption.textContent = this._name;
    popupView.classList.add("popup_opened");
    document.addEventListener("keyup", handleEscUp);
  }

  _setListeners() {
    this._galleryDeleteButton.addEventListener("click", () =>
      this._deleteCard()
    );
    this._galleryLikeButton.addEventListener("click", (evt) =>
      this._likeCard(evt)
    );
    this._galleryPhoto.addEventListener("click", () => this._handleCardClick());
  }
  //создаем метод который возвращает элемент
  getView() {
    this._element = this._getTemplate(); //возвращаем
    this._galleryName = this._element.querySelector(".gallery__name");
    this._galleryPhoto = this._element.querySelector(".gallery__photo");
    this._galleryDeleteButton = this._element.querySelector(
      ".gallery__delete-button"
    );
    this._galleryLikeButton = this._element.querySelector(
      ".gallery__like-button"
    );
    this._galleryName.textContent = this._name;
    this._galleryPhoto.src = this._link;
    this._galleryPhoto.alt = this._name;
    this._setListeners(); // добавляем обработчики
    return this._element; // возвращаем наружу
  }
}
