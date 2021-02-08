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
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
    popup.classList.contains("popup_opened");
    popup.classList.toggle("popup_opened");
}

let submitHandler = (e) => {
    e.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    console.log(popup.classList);
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", openPopup);
formElement.addEventListener("submit", submitHandler);

// пока js мне дается крайне тяжело :(
    //извините за глупые ошибки( 