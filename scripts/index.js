const popupProfile = document.querySelector(".popup_edit_profile");
const popupCard = document.querySelector(".popup_add_card");
const popupView = document.querySelector(".popup_view_foto");

const popupOverlayProfile = document.querySelector(".popup__overlay-profile");
const popupOverlayAddCard = document.querySelector(".popup__overlay-add-card");
const popupOverlayViewFoto = document.querySelector(".popup__overlay-view-foto");

const openPopupProfileBtn = document.querySelector(".profile__edit-button");
const openPopupCardBtn = document.querySelector(".profile__add-button");

const closePopupProfileBtn = document.querySelector(".popup__close-button");
const closePopupCardBtn = document.querySelector(".popup__close-button_card");
const closePopupViewBtn = document.querySelector(".popup__close-button_view");

const saveCardButton = document.querySelector(".popup__form-button_add_card");

const formProfileElement = document.querySelector("form[name=edit-profile]");
const formCardElement = document.querySelector("form[name=edit-card]");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");

const formName = document.querySelector(".popup__input_value_name");
const formJob = document.querySelector(".popup__input_value_job");
const formCardName = document.querySelector(".popup__input_card_name");
const formCardSrc = document.querySelector(".popup__input_card_src");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const galleryContainer = document.querySelector(".gallery__cards");

const photoTemplate = document.querySelector('template').content;


function openPopup(item) {
  item.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc)
}

const closePopup = () => {
  const openedPopup = document.querySelector('.popup_opened')
  openedPopup.classList.remove("popup_opened");
  window.removeEventListener('keydown', closePopupEsc)
}

function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

function handleLike(evt) {
  evt.target.classList.toggle('gallery__like-button_active');
 } 

 function dropObject (element) {
    element.remove();
  }

 function openImageView(element) {
   return function openImagePopup () {
      popupImage.src = element.link;
      popupCaption.textContent = element.name;
      openPopup(popupView);
 }
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closePopup();
}

function handleCardSubmit(evt) {
  const cardData = {
    name: formCardName.value,
    link: formCardSrc.value
  }
  galleryContainer.prepend(createCard(cardData))
  closePopup();
  saveCardButton.classList.add('popup__form-button_inactive');
  saveCardButton.setAttribute('disabled', true);
  formCardElement.reset();
  evt.preventDefault();
}

function createCard(cardData) {
  const photoElement = photoTemplate.querySelector('.gallery__card').cloneNode(true);
  const galleryPhoto = photoElement.querySelector('.gallery__photo');
  const galleryText = photoElement.querySelector('.gallery__text');
  const galleryDeleteButton = photoElement.querySelector('.gallery__delete-button');
  const galleryLikeButton =  photoElement.querySelector('.gallery__like-button')
  galleryPhoto.src = cardData.link;
  galleryText.textContent = cardData.name;
  galleryPhoto.alt = cardData.name;
  galleryLikeButton.addEventListener('click', handleLike);
  galleryDeleteButton.addEventListener('click', () => dropObject(photoElement)); 
  galleryPhoto.addEventListener('click', openImageView(cardData));

  return photoElement;
}

initialCards.forEach(function (element) {
  galleryContainer.append(createCard(element));
})

openPopupProfileBtn.addEventListener("click", function() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  openPopup(popupProfile);
});

openPopupCardBtn.addEventListener("click", () => openPopup(popupCard));
closePopupProfileBtn.addEventListener("click", closePopup);
closePopupCardBtn.addEventListener("click", closePopup);
closePopupViewBtn.addEventListener("click", closePopup);
popupOverlayProfile.addEventListener("click", closePopup);
popupOverlayAddCard.addEventListener("click", closePopup);
popupOverlayViewFoto.addEventListener("click", closePopup);
formProfileElement.addEventListener("submit", handleProfileSubmit);
formCardElement.addEventListener("submit", handleCardSubmit);