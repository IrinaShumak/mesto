const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'};

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const formList = Array.from(document.querySelectorAll(`${selectors.formSelector}`));  

const profileOpenBtn = document.querySelector('.profile-info__edit-button');
const popupProfile = document.querySelector('.popup_location_profile');


const popupPhoto = document.querySelector('.popup_location_photo');
const popupAddBtn = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

const profileForm = document.querySelector('.popup__form_location_profile');
const formPhoto = document.querySelector('.popup__form_location_photo');

const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_description');
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__description');
const placeInput = document.querySelector('.popup__input_field_place');
const linkInput = document.querySelector('.popup__input_field_link');


const cardsOnline = document.querySelector('.elements');

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);  
}

function closePopup (popup) {  
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc (event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');    
    closePopup(popupOpened);
  }
}

function diasbleSaveButton (button) {
  button.classList.add(`${selectors.inactiveButtonClass}`);
  button.setAttribute("disabled", true);
}

// Form submitter for editing profile
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Prevent standard form submission
  
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;    
    closePopup(popupProfile);
}

function handlePhotoFormSubmit (evt) {
  evt.preventDefault();
  const item = {name: placeInput.value, link: linkInput.value};
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();
  cardsOnline.prepend(cardElement);
  closePopup(popupPhoto);
  evt.target.reset();
  const buttonPhotoFormSubmit = evt.target.querySelector(`${selectors.submitButtonSelector}`);
  diasbleSaveButton(buttonPhotoFormSubmit);
}


profileOpenBtn.addEventListener('click', function(event){
  openPopup(popupProfile);  
  });

popupAddBtn.addEventListener('click', function(event){
  openPopup(popupPhoto);
  });

popups.forEach((popup) => {  
  popup.addEventListener('click', function (event) {    
    if (event.target == event.currentTarget || event.target.classList.contains('popup__close')) {
      closePopup(popup);     
    }});
});

// Attach submitter functions to the forms
profileForm.addEventListener('submit', handleProfileFormSubmit);
formPhoto.addEventListener('submit', handlePhotoFormSubmit);
 
initialCards.forEach((item) => {  
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();
  cardsOnline.append(cardElement);
});

formList.forEach((formElement) => {     
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.enableValidation();
  })
