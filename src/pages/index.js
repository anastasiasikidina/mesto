import "../pages/index.css";

import Card from "../components/Card.js";
import { initialCards } from "../components/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
//import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

//export { openPopup, popupView };

const popupProfile = document.querySelector(".popup_edit_profile");
const popupCard = document.querySelector(".popup_add_card");
const popupView = document.querySelector(".popup_view_foto");

const popupOverlayProfile = document.querySelector(".popup__overlay-profile");
const popupOverlayAddCard = document.querySelector(".popup__overlay-add-card");
const popupOverlayViewFoto = document.querySelector(
  ".popup__overlay-view-foto"
);

const profileEditBtn = document.querySelector(".profile__edit-button");
const openPopupCardBtn = document.querySelector(".profile__add-button");

const closePopupProfileBtn = document.querySelector(".popup__close-button");
const closePopupCardBtn = document.querySelector(".popup__close-button_card");
const closePopupViewBtn = document.querySelector(".popup__close-button_view");

const saveCardButton = document.querySelector(".popup__form-button_add_card");

const formProfileElement = document.querySelector("form[name=edit-profile]");
const formCardElement = document.querySelector("form[name=edit-card]");

const profileNameSelector = ".profile__name";
const profileJobSelector = ".profile__profession";

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

//создаем карточку
const renderCard = (data) => {
  const newCard = new Card(data, photoTemplate, (name, link) =>
    popupWithImage.open(link, name)
  );

  return newCard.getView();
};

//добавление карточек в разметку
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(renderCard(data));
    },
  },
  galleryContainer
);

cardList.renderItems();

//открытие модального окна карточки
const popupWithImage = new PopupWithImage(".popup_view_foto");
popupWithImage.setEventListeners();

//редактирования профиля
function handleProfileSubmit(data) {
  profileName.textContent = data["edit-profile-name"];
  profileJob.textContent = data["edit-profile-job"];
  editFormPopup.close();
}

const editFormPopup = new PopupWithForm(
  ".popup_edit_profile",
  handleProfileSubmit
);
editFormPopup.setEventListeners();

//добавления карточки
function handleCardSubmit(data) {
  const cardData = {
    name: data["edit-card-name"],
    link: data["edit-card-link"],
  };
  popupCardValidator.disableButtonSubmit();
  cardList.addItem(renderCard(cardData));
  addCardPopup.close();
}

const addCardPopup = new PopupWithForm(".popup_add_card", handleCardSubmit);
addCardPopup.setEventListeners();

//получение данных профиля
const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

// Валидация попапа при редактировании профиля

const popupProfileValidator = new FormValidator(config, popupProfile);
popupProfileValidator.enableValidation();

// Валидация попапа при добавлении карточки

const popupCardValidator = new FormValidator(config, popupCard);
popupCardValidator.enableValidation();

const getProfileInfo = () => {
  const profileInfo = userInfo.getUserInfo();
  formName.value = profileInfo.nameElement;
  formJob.value = profileInfo.professionElement;
  popupProfileValidator.resetValidation();
  editFormPopup.open();
};

openPopupCardBtn.addEventListener("click", () => addCardPopup.open());
profileEditBtn.addEventListener("click", getProfileInfo);
