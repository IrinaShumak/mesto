import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);    
    this._fullSizePhoto = document.querySelector('.popup__photo');
    this._fullSizeHeading = document.querySelector('.popup__image-heading');
          
  }

  openPopup (link, text) {
    this._fullSizePhoto.src = link;  
    this._fullSizePhoto.alt = text;
    this._fullSizeHeading.textContent = text;
    super.openPopup();    
  }
}