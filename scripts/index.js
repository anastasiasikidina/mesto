let root = document.querySelector('.root');
let popup = root.querySelector('.popup');
let editButton = root.querySelector('.profile__edit-button');
let closeButton = root.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('input[name=name]');
let jobInput = formElement.querySelector('input[name=profession]')
let jobField = root.querySelector('.profile__profession');
let nameField = root.querySelector('.profile__name');

let openPopup = (e) => {
    e.preventDefault();
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
    popup.classList.toggle("popup_opened");

}

/*const closePopup = (e) => {
    e.preventDefault();
    popup.classList.toggle("popup_opened"); тут я немного запуталась - нужно совсем убрать это из кода(все что закомитела или толлько последнюю функцию с toggle)?

}*/

const submitHandler = (e) => {
    e.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    popup.classList.toggle("popup_opened");/*тут уже тоже непонятки какую функцию надо вызвать :( */

}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", submitHandler);