import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);    
    this._fullSizePhoto = this._popup.querySelector('.popup__photo');
    this._fullSizeHeading = this._popup.querySelector('.popup__image-heading');
          
  }

  openPopup (link, text) {
    this._fullSizePhoto.src = link;  
    this._fullSizePhoto.alt = text;
    this._fullSizeHeading.textContent = text;
    super.openPopup();    
  }
}