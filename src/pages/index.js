import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {  
  selectors, 
  cardSelector, 
  profileOpenBtn, 
  addPhotoBtn,
  avatarImage,
  avatarInput,  
  nameInput, 
  jobInput
} from '../utils/input.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

const userID = 'a0200cfcf07ddbfcdde7f472';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: '004567af-e6a2-4c65-9d5d-001e22f88e2a',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: '.profile-info__name',
  jobSelector: '.profile-info__description',
  avatarSelector: '.profile__image'
});



api.takeUserInfo()
.then((data) => {  
  userInfo.getUserInfoFromServer(data);  
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
});

const profileForm = new PopupWithForm(  
  '.popup_location_profile',
  '.popup__form_location_profile',
  selectors,  
  ({fullname, description}) => {    
    api.updateProfileInfo({fullname, description})
    .then((data) => {      
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err); 
    })
    .finally(() => {
      profileForm.renderLoading(false);
    });  
  });
profileForm.setEventListeners(); 

const avatarForm = new PopupWithForm(  
  '.popup_location_avatar',
  '.popup__form_location_avatar',
  selectors, 
  ({avatar}) => {    
    api.updateAvatar({avatar})
    .then((data) => {      
      userInfo.setUserAvatar(data);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err); 
    })
    .finally(() => {
      avatarForm.renderLoading(false);
    });
  });
  avatarForm.setEventListeners(); 

const popupWithImage = new PopupWithImage('.popup_location_element');
popupWithImage.setEventListeners();

function deleteCardByClick (delteCardCallBack, id) {   
    api.deleteCard(id)
      .then(() => {
        delteCardCallBack();
      })
      .catch((err) => {
       console.log('Ошибка. Запрос не выполнен: ', err); 
      }) 
}

const deletionPopup = new PopupWithConfirmation(
  '.popup_location_trash',
  '.popup__form_location_trash',
  deleteCardByClick,  
  )
deletionPopup.setEventListeners();

function confirmDeleteCardByClick (delteCardCallBack, chosenCardId) {
  deletionPopup.openPopup(delteCardCallBack, chosenCardId);
}

function createNewCard (item) {  
  const card = new Card(
    item, 
    '#element',
    popupWithImage.openPopup.bind(popupWithImage),
    confirmDeleteCardByClick,    
    (id, method) => {
      api.likePhoto(id, method)
        .then((data) => {               
          card.like();
          card.countLikes(data);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err); 
        })
    },
    userInfo.getUserInfo()
    );    
  const cardElement = card.generateCard();
  card.countLikes(item);
  card.makeLikeActive(item);
  card.removeTrashBtn(item);
  return cardElement;
}

const cardsOnline = new Section({
  items: [],
  renderer: (item) => {    
    cardsOnline.addItem(createNewCard (item));
  },
}, 
cardSelector);

api.getInitialCards()
    .then((initialCards) => {      
      cardsOnline.renderItems(initialCards);      
    })
    .catch((err) => {
      console.log('Ошибка. Карточки не могут быть загружены: ', err);
    });

const photoForm = new PopupWithForm(  
  '.popup_location_photo',
  '.popup__form_location_photo',
  selectors,  
  ({name, link}) => {
    api.addNewCards({name, link})
    .then((data) => {      
      cardsOnline.addNewItem(createNewCard (data));
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err); 
    })
    .finally(() => {
      photoForm.renderLoading(false);
    });    
  })
photoForm.setEventListeners();

cardsOnline.renderItems();
 
const profileformValidator = new FormValidator(selectors, profileForm._form);
profileformValidator.enableValidation();

const photoformValidator = new FormValidator(selectors, photoForm._form);
photoformValidator.enableValidation();

const avatarformValidator = new FormValidator(selectors, avatarForm._form);
avatarformValidator.enableValidation();
  
profileOpenBtn.addEventListener('click', () => {
  const currentProfileData = userInfo.getUserInfo();
  nameInput.value = currentProfileData.profileName;
  jobInput.value = currentProfileData.profileJob;
  profileformValidator.resetValidation();
  profileForm.openPopup();
});
  
addPhotoBtn.addEventListener('click', () => {      
  photoformValidator.resetValidation();
  photoForm.openPopup();
});

avatarImage.addEventListener('click', () => {
  const currentAvatarData = userInfo.getUserInfo();
  avatarInput.value = currentAvatarData.profileAvatar;  
  avatarformValidator.resetValidation();
  avatarForm.openPopup();
});