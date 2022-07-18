export class Card {
  constructor(data, cardSelector, handleCardClick, handleTrashClick) {
    this._cardImageLink = data.link;
    this._cardText = data.name;
    this._likeNumber = data.likes.length;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;     
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
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._trashBtn = this._element.querySelector('.element__trash-button');

    this._setEventListeners();

    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = this._cardText;
    this._element.querySelector('.element__title').textContent = this._cardText;
    this._likeCounter.textContent = this._likeNumber;

    return this._element;
  }

  _like () {
    this._likeBtn.classList.toggle('element__like-button_active');
  }

  deleteCard () {
    this._element.remove();
    this._element = null;      
  }     
  

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._like()});
      
    this._trashBtn.addEventListener('click', () => {      
      this._handleTrashClick();
    });
     
    this._cardImage.addEventListener('click', () => {          
      this._handleCardClick(this._cardImageLink, this._cardText);
      });
  }
}