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

const profileOpenBtn = document.querySelector('.profile-info__edit-button');
const popupProfile = document.querySelector('.popup_location_profile');


const popupPhoto = document.querySelector('.popup_location_photo');
const popupAddBtn = document.querySelector('.profile__add-button')


const popupFullSize = document.querySelector('.popup_location_element');
const fullSizePhoto = document.querySelector('.popup__photo');
const fullSizeHeading = document.querySelector('.popup__image-heading');

const closeButtons = document.querySelectorAll('.popup__close');

const profileForm = document.querySelector('.popup__form_location_profile');
const formPhoto = document.querySelector('.popup__form_location_photo');

const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_description');
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__description');
const placeInput = document.querySelector('.popup__input_field_place');
const linkInput = document.querySelector('.popup__input_field_link');

const cardsTemplate = document.querySelector('#element').content;
const cardsOnline = document.querySelector('.elements');

function openPopup (popup) {
  popup.classList.add('popup_opened');  
}

function closePopup (popup) {  
  popup.classList.remove('popup_opened');
}

function closePopupEsc (event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);}
}

function like (likeBtn) {
  likeBtn.classList.toggle('element__like-button_active');
}

function deleteCard (trashBtn) {
  const listItem = trashBtn.closest('.element');
  listItem.remove();
}

function createCard (item) {
  //card creation 
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
  const likeBtn = cardsElement.querySelector('.element__like-button');
  const trashBtn = cardsElement.querySelector('.element__trash-button');
  const cardImage = cardsElement.querySelector('.element__photo');
  
  cardImage.src = item.link;  
  cardImage.alt = item.name;
  cardsElement.querySelector('.element__title').textContent = item.name;
  //like button
  likeBtn.addEventListener('click', function(event){
    like(likeBtn)});
  //trash button  
  trashBtn.addEventListener('click', function(event){
    deleteCard(trashBtn, item)});
  //open Full size photo 
  cardImage.addEventListener('click', function(event){
    openPopup(popupFullSize);
    document.addEventListener('keydown', closePopupEsc);
    fullSizePhoto.src = item.link;  
    fullSizePhoto.alt = item.name;
    fullSizeHeading.textContent = item.name;
    }); 

  return cardsElement;  
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
  cardsOnline.prepend(createCard(item));
  closePopup(popupPhoto);
  evt.target.reset();
}

profileOpenBtn.addEventListener('click', function(event){
  openPopup(popupProfile);
  document.addEventListener('keydown', closePopupEsc); 
  });

popupAddBtn.addEventListener('click', function(event){
  openPopup(popupPhoto);
  document.addEventListener('keydown', closePopupEsc);
  });

closeButtons.forEach((button) => {   
  const popup = button.closest('.popup');  
  popup.addEventListener('click', function (event) {    
    if (event.target == event.currentTarget || event.target == button) {
      closePopup(popup);
      document.removeEventListener('keydown', closePopupEsc);   
    }});  
});



// Attach submitter functions to the forms
profileForm.addEventListener('submit', handleProfileFormSubmit);
formPhoto.addEventListener('submit', handlePhotoFormSubmit);
 
initialCards.forEach((item) => {  
  cardsOnline.append(createCard(item));
});