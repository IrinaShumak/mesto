export class Card {
  constructor(data, cardSelector, handleCardClick, handleTrashClick, handleLikeClick, getUserId) {
    this._cardImageLink = data.link;
    this._cardText = data.name;    
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._userId = getUserId.id;
    this._likes = data.likes;
    
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;    
    this._handleLikeClick = handleLikeClick;
    this.deleteCard = this.deleteCard.bind(this);  
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
    return this._element;
  }

  countLikes (cardInfo) {
     
    this._likeCounter.textContent = cardInfo.likes.length;    
  }

  makeLikeActive (cardInfo) {
    if (cardInfo.likes.some(like => like._id == this._userId)) {this._likeBtn.classList.add('element__like-button_active')};
  } 

  like () {
    this._likeBtn.classList.toggle('element__like-button_active');    
  }

  removeTrashBtn (item) {
    if (item.owner._id !== this._userId) {
      this._trashBtn.remove();}
  }

  deleteCard () {
    this._element.remove();
    this._element = null;      
  }  

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {      
      if (this._likeBtn.classList.contains('element__like-button_active')) {
        this._method = "DELETE"} else {
          this._method = "PUT"};            
      this._handleLikeClick(this._cardId, this._method)
    });
      
    this._trashBtn.addEventListener('click', () => {
      this._handleTrashClick(this.deleteCard, this._cardId);
    });
     
    this._cardImage.addEventListener('click', () => {          
      this._handleCardClick(this._cardImageLink, this._cardText);
      });
  }
}