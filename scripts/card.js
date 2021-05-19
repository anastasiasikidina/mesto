 class Card {
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
  
      const _galleryText = this._element.querySelector('.gallery__text')
      const _galleryPhoto = this._element.querySelector('.gallery__photo');
      const _galleryDeleteButton = this._element.querySelector('.gallery__delete-button');
      const _galleryLikeButton = this._element.querySelector('.gallery__like-button');
  
      _galleryText.textContent = this._name;
      _galleryPhoto.src = this._link;
      _galleryPhoto.alt = this.name;
  
      this._setListeners(_galleryDeleteButton, _galleryLikeButton, _newCardImage);
  
      return this._element;
    }
  // toggle кнопки like
    _like(evt) {
      evt.target.classList.toggle('gallery__like-button_active');
     } 
    
  //удаляем элемент
    _delete() {
      this._element.remove();
    }
  
    _setListeners(galleryDeleteButton, galleryLikeButton, galleryPhoto) {
      galleryDeleteButton.addEventListener('click', (evt) => this._delete(evt));
      galleryLikeButton.addEventListener('click', (evt) => this._like(evt));
      galleryPhoto.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    }
  }
  

export {Card}