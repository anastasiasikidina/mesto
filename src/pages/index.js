import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  addButton,
  cardTemplate,
  config,
  editButton,
  placeContainer,
} from "../components/constants.js";

import "../images/logo.svg";
import "../images/image.jpg";
import "./index.css";


const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-25",
  headers: {
    authorization: "aa278cc5-8371-4a9c-869b-e11b649efea5",
    "Content-Type": "application/json",
  },
});

const state = {
  _id: "",
};

//карточка //

const cardImagePopup = new PopupWithImage("#imagePlacePopup");
//подтверждение удаления
const deleteCardPopup = new PopupDeleteCard("#deletePopup");

cardImagePopup.setEventListeners();
deleteCardPopup.setEventListeners();

const handleCardClick = (data) => {
  cardImagePopup.open(data);
};
//удаление публикации
const deleteCardCallback = (api, id, e) => {
  deleteCardPopup.setAttributes(api, id, e);
  deleteCardPopup.open();
};

// аватар //

const changeAvatarPopup = new PopupWithForm(
  "#avatarChangePopup",
  ({ link }) => {
    api
      .updateAvatar(link)
      .then((user) => {
        userInfo.setAvatarSrc(user.avatar);
      })
      .then(() => {
        changeAvatarPopup.close();
      })
      .catch((err) => console.log(err));
  }
);

changeAvatarPopup.setEventListeners();

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__profession",
  ".profile__avatar"
);

const editAvatarElement = document.querySelector(
  ".profile__avatar-edit-button"
);

const avatarChangeValidator = new FormValidator(
  config,
  changeAvatarPopup.popupElement.querySelector(config.formSelector)
);

avatarChangeValidator.enableValidation();

editAvatarElement.addEventListener("click", () => {
  changeAvatarPopup.open();
  avatarChangeValidator.resetValidation();
});

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([user, cards]) => {
    state._id = user._id;
    userInfo.setUserInfo(user.name, user.about, user.avatar);
    console.log(cards);
    const renderPlaces = new Section(
      {
        items: cards,
        renderer: (data) => {
          return new Card(
            state._id,
            data,
            cardTemplate,
            api,
            handleCardClick,
            deleteCardCallback
          ).render();
        },
      },
      placeContainer
    );

    renderPlaces.renderItems();

    const cardPopup = new PopupWithForm("#placePopup", (data) => {
      api
        .addCard(data.name, data.link)
        .then((newCardItem) => {
          renderPlaces.addItem(newCardItem);
        })
        .then(() => {
          cardPopup.close();
        })
        .catch((err) => console.log(err));
    });

    const cardValidator = new FormValidator(
      config,
      cardPopup.popupElement.querySelector(config.formSelector)
    );
    cardValidator.enableValidation();

    cardPopup.setEventListeners();
    addButton.addEventListener("click", () => {
      cardPopup.open();
      cardValidator.resetValidation();
    });
  })
  .catch((err) => console.log(err));

const profilePopup = new PopupWithForm("#editPopup", (data) => {
  const { name, profession } = data;
  api
    .updateUserInformation(name, profession)
    .then((user) => {
      console.log("user data:");
      console.log(data);
      userInfo.setUserInfo(user.name, user.about, user.avatar);
    })
    .then(() => {
      profilePopup.close();
    })
    .catch((err) => console.log(err));
});

const profilePopupValidator = new FormValidator(
  config,
  profilePopup.popupElement.querySelector(config.formSelector)
);

profilePopupValidator.enableValidation();
profilePopup.setEventListeners();

// кнопки //
editButton.addEventListener("click", (e) => {
  profilePopup.open();
  profilePopupValidator.resetValidation();

  const { name, profession } = userInfo.getUserInfo();
  profilePopup.inputsList.forEach((node) => {
    if (node.name === "name") {
      node.value = name;
    } else {
      node.value = profession;
    }
  });
});

