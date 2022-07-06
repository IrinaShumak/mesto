import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {
  initialCards, 
  selectors, 
  cardSelector, 
  profileOpenBtn, 
  addPhotoBtn, 
  placeInput, 
  linkInput, 
  nameInput, 
  jobInput
} from '../components/Input.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PicturePopup.js';


const userInfo = new UserInfo({
  nameSelector: '.profile-info__name',
  jobSelector: '.profile-info__description'
});

const profileForm = new PopupWithForm(  
  '.popup_location_profile',
  '.popup__form_location_profile',  
  (evt) => { 
    userInfo.setUserInfo(profileForm._getInputValues());    
  });
profileForm.setEventListeners();  
  

const popupWithImage = new PopupWithImage('.popup_location_element');
popupWithImage.setEventListeners();

function createNewCard (item) {
  const card = new Card(item, '#element', popupWithImage.openPopup.bind(popupWithImage));
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsOnline = new Section({
  items: initialCards,
  renderer: (item) => {    
    cardsOnline.addItem(createNewCard (item))
  },
}, 
cardSelector);

const photoForm = new PopupWithForm(  
  '.popup_location_photo',
  '.popup__form_location_photo',  
  (evt) => { 
    cardsOnline.addNewItem(createNewCard ({name: placeInput.value, link: linkInput.value}));
  })
photoForm.setEventListeners();

cardsOnline.renderItems(); 
 
const profileformValidator = new FormValidator(selectors, profileForm._form);
profileformValidator.enableValidation();

const photoformValidator = new FormValidator(selectors, photoForm._form);
photoformValidator.enableValidation();
  
profileOpenBtn.addEventListener('click', () => {    
  const currentData =  userInfo.getUserInfo();
  nameInput.textContent = currentData.profileName;
  jobInput.textContent = currentData.profileJob;
  profileformValidator.resetValidation();
  profileForm.openPopup();
});
  
addPhotoBtn.addEventListener('click', () => {      
  photoformValidator.resetValidation();
  photoForm.openPopup();
});   