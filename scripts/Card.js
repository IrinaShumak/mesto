export class Card {
  constructor(data, cardSelector, openPopup) {
    this._cardImageLink = data.link;
    this._cardText = data.name;
    this._cardSelector = cardSelector;
    this._popupFullSize = document.querySelector('.popup_location_element');
    this._fullSizePhoto = document.querySelector('.popup__photo');
    this._fullSizeHeading = document.querySelector('.popup__image-heading');
    this._openPopup = openPopup;      
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__photo');    

    this._likeBtn = this._element.querySelector('.element__like-button');
    this._trashBtn = this._element.querySelector('.element__trash-button');

    this._setEventListeners();

    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = this._cardText;
    this._element.querySelector('.element__title').textContent = this._cardText;

    return this._element;
  }

  _like () {
    this._likeBtn.classList.toggle('element__like-button_active');
  }

  _deleteCard () {
    this._element.remove();
    this._element = null;      
  }   

  _openFull (){
    this._fullSizePhoto.src = this._cardImageLink;  
    this._fullSizePhoto.alt = this._cardText;
    this._fullSizeHeading.textContent = this._cardText;
    this._openPopup(this._popupFullSize);    
  }
  

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._like()});
      
    this._trashBtn.addEventListener('click', () => {
      this._deleteCard()});
     
    this._cardImage.addEventListener('click', () => {          
      this._openFull();
      });
  }
}