//Импортируем функции открытия попапа и селектор попапа
import { openPopup, popupView } from "../index.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._popupImage = document.querySelector(".popup__image");
    this._popupCaption = document.querySelector(".popup__caption");
  }

  // клонируем темплейт
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
  //наполняем данными
  _handlePhotoCardClick() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupCaption.textContent = this._name;
    openPopup(popupView);
  }

  _setListeners() {
    this._galleryDeleteButton.addEventListener("click", () =>
      this._deleteCard()
    );
    this._galleryLikeButton.addEventListener("click", (evt) =>
      this._likeCard(evt)
    );
    this._galleryPhoto.addEventListener("click", () =>
      this._handlePhotoCardClick()
    );
  }
  //создаем метод который возвращает элемент
  getView() {
    this._element = this._getTemplate(); //возвращаем
  //находим элементы в шаблоне
    this._galleryName = this._element.querySelector(".gallery__name");
    this._galleryPhoto = this._element.querySelector(".gallery__photo");
    this._galleryDeleteButton = this._element.querySelector(
      ".gallery__delete-button"
    );
    this._galleryLikeButton = this._element.querySelector(
      ".gallery__like-button"
    );

    //вставляем новые значения
    this._galleryPhoto.src = this._link;
    this._galleryPhoto.alt = this._name;
    this._galleryName.textContent = this._name;

    this._setListeners(); // добавляем обработчики
    return this._element; // возвращаем наружу
  }
}
