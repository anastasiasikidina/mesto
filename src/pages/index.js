import '../pages/index.css';

import Card from "../components/Card.js";
import { initialCards } from "../components/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

export { openPopup, popupView };

const popupProfile = document.querySelector(".popup_edit_profile");
const popupCard = document.querySelector(".popup_add_card");
const popupView = document.querySelector(".popup_view_foto");

const popupOverlayProfile = document.querySelector(".popup__overlay-profile");
const popupOverlayAddCard = document.querySelector(".popup__overlay-add-card");
const popupOverlayViewFoto = document.querySelector(
  ".popup__overlay-view-foto"
);

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

const photoTemplate = ".template";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__form-message-error_active",
};

// Валидация попапа при редактировании профиля

const popupProfileValidator = new FormValidator(config, popupProfile);
popupProfileValidator.enableValidation();

// Валидация попапа при добавлении карточки

const popupCardValidator = new FormValidator(config, popupCard);
popupCardValidator.enableValidation();

//инициализируем карточку
const renderCard = (data) => {
  const card = new Card(data, photoTemplate, openPopup);
  galleryContainer.prepend(card.getView()); // возвращаем карточку методом getView
};

function openPopup(popupView) {
  popupView.classList.add("popup_opened");
  document.addEventListener("keyup", closePopupEsc);
}

initialCards.forEach(function (element) {
  renderCard(element);
});

const closePopup = () => {
  const openedPopup = document.querySelector(".popup_opened");
  openedPopup.classList.remove("popup_opened");
  document.removeEventListener("keyup", closePopupEsc);
};

function closePopupEsc(event) {
  if (event.key === "Escape") {
     closePopup();
  }
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closePopup();
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: formCardName.value,
    link: formCardSrc.value,
  };
  popupCardValidator.disableButtonSubmit();
  renderCard(cardData);
  closePopup();
  formCardElement.reset();
}

openPopupProfileBtn.addEventListener("click", function () {
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
