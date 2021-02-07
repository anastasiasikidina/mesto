const overlays = document.querySelectorAll('.page__overlay');
const overlayLook = document.querySelector('.page__overlay_type_look');
const overlayAdd = document.querySelector('.page__overlay_type_add');
const overlayEdit = document.querySelector('.page__overlay_type_edit');
const buttonEdit = document.querySelector('.profile__button_edit');
const nameInput = overlayEdit.querySelector('.popup__input_el_name');
const jobInput = overlayEdit.querySelector('.popup__input_el_about');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about');
const formEdit = document.querySelector('.popup_do_edit');
const formAdd = document.querySelector('.popup_do_add');
const buttonAdd = document.querySelector('.profile__button_add');
const template = document.querySelector('.template');
const contentElements = document.querySelector('.content__elements');
const captionInput = overlayAdd.querySelector('.popup__input_el_caption');
const imageInput = overlayAdd.querySelector('.popup__input_el_image');
const captionPopup = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup__image');
const formElement = document.querySelector('.popup_type_form');

function openPopup (popup) {
  clearForm(popup);
  popup.classList.add('page__overlay_active');
};

function closePopup (popup) {
  popup.classList.remove('page__overlay_active');
};

function handleFormSubmitAdd (evt) {
  const myObject = {
    name: captionInput.value,
    link: imageInput.value};
  getCard(myObject);
  captionInput.value = '';
  imageInput.value = '';
  renderCardPrepend(myObject);
  closePopup(overlayAdd);
};

function handleFormSubmitEdit (evt) {
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(overlayEdit);
};

function handleOverlaysItem (overlay) {
  overlay.addEventListener('click', handleOverlay);
};

function handleOverlay (event) {
  if (event.target === event.currentTarget) { 
    closePopup(event.target);
  };
};

function getCard (el) {
  const htmlElement = template.content.cloneNode(true);
  htmlElement.querySelector('.elements__caption').innerText = el.name;
  htmlElement.querySelector('.elements__image').setAttribute('src', el.link);
  htmlElement.querySelector('.elements__image').setAttribute('alt', el.name);
  htmlElement.querySelector('.elements__button-delete').addEventListener('click', handleDelete);
  htmlElement.querySelector('.elements__button-like').addEventListener('click', handleLike);
  htmlElement.querySelector('.elements__image').addEventListener('click', () => handleLook(el));
  return htmlElement;
};

function renderCardAppend (card) {
  contentElements.append(getCard(card));
};

function renderCardPrepend (card) {
  contentElements.prepend(getCard(card));
};

function handleDelete(evt) {
  evt.target.closest('.elements__item').remove();
};

function handleLike(evt) {
  evt.target.classList.toggle('elements__button-like_active');
};

function handleLook(el) {
  imagePopup.setAttribute('src', el.link);
  imagePopup.setAttribute('alt', `Фото ${el.name}`);
  captionPopup.textContent = el.name;
  overlayLook.querySelector('.popup__button').addEventListener('click', () => closePopup(overlayLook));
  openPopup(overlayLook);
};

function clearForm (overlay) { 
  const inputList = Array.from(overlay.querySelectorAll('.popup__input')); 
  const formElement = overlay.querySelector('.popup');
  const buttonElement = overlay.querySelector('.popup__submit');
  const object = {
    inputErrorClass: 'popup__input_type_error',
    inputErrorClassActive: 'popup__input-error_active'
};
  inputList.forEach ((inputItem) => {
    inputItem.value = '';
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
  hideInputError(formElement, inputItem, object);
  buttonElement.classList.add('popup__submit_inactive');
  formElement.removeEventListener('submit', handleFormSubmit);
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  });
};

overlays.forEach (popup => {
  popup.querySelector('.popup__button').addEventListener('click', () => closePopup(popup));
  handleOverlaysItem(popup);
});

initialCards.forEach(card => {
  renderCardAppend(card);
});

buttonAdd.addEventListener('click', () => openPopup (overlayAdd));
buttonEdit.addEventListener('click', () => openPopup (overlayEdit));
