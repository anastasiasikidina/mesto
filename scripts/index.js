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
    popup.classList.toggle("popup_opened")
    if (popup.classList.contains("popup_opened")) {
        nameInput.value = nameField.textContent;
        jobInput.value = jobField.textContent;
    }
}

//или вот так? после прочтения статей, подумала, что можно немного изменить вид функции, чтобы она стала понятней

//насколько я поняла, эта функция должна открывать попап и если он открыт, то добавлять информацию

/*function openPopup() {
    popup.classList.toggle("popup_opened")
    if (popup.classList.contains("popup_opened")) {
        nameInput.value = nameField.textContent;
        jobInput.value = jobField.textContent;
    }
}*/

let submitHandler = (e) => {
    e.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    openPopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", openPopup);
formElement.addEventListener("submit", submitHandler);