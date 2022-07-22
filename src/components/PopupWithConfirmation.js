import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);  
    this._form = this._popup.querySelector(formSelector);
  }

  openPopup (delteCardCallBack, chosenCardId) {
    this._delteCardCallBack = delteCardCallBack;  
    this._id = chosenCardId;    
    super.openPopup();
  }
  
  _handleSubmit = (evt) => {
    evt.preventDefault();    
    this._handleFormSubmit(this._delteCardCallBack, this._id);    
    this.closePopup();
  }
  
  setEventListeners () {
    super.setEventListeners ();    
    this._form.addEventListener('submit', this._handleSubmit)}  
  
}