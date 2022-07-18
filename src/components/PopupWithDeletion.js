import Popup from "./Popup.js";
export default class PopupWithDeletion extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;    
    this._form = this._popup.querySelector(formSelector);
  }
  

  setEventListeners () {
    super.setEventListeners ();    
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //this._handleFormSubmit({_id});
      this.closePopup();
    }) 
    }
  }