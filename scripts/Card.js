 export default class Card {
    constructor(data, cardSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card__item')
      .cloneNode(true)
  
      return cardElement;
    }
  //вставляем данные в разметку и подготовим карточку к публикации
    createCard() {
      this._element = this._getTemplate();
  
      this.galleryName = element.querySelector('.gallery__name');
      this.galleryPhoto = element.querySelector('.gallery__photo');
      this.galleryDeleteButton = element.querySelector('.gallery__delete-button');
      this.galleryLikeButton = element.querySelector('.gallery__like-button');
  
      _galleryName.textContent = this._name;
      _galleryPhoto.src = this._link;
      _galleryPhoto.alt = this._name;
  
      this._setListeners(_galleryDeleteButton, _galleryLikeButton, _newCardImage);
  
      return this._element;
    }
  // toggle кнопки like
    _likeCard(evt) {
      evt.target.classList.toggle('gallery__like-button_active');
     } 
    
  //удаляем элемент
    _deleteCard() {
      this._element.remove();
    }
  
    _setListeners() {
      this._galleryDeleteButton.addEventListener('click', () => this._delete());
      this._galleryLikeButton.addEventListener('click', (evt) => this._like(evt));
      this._galleryPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
      });
    }
 }