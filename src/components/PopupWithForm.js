import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    
    this._form = document.querySelector(formSelector);               
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  setEventListeners () {
    super.setEventListeners (this._popup);   
         
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(evt);
      this.closePopup();
    }) 
    };
  
  closePopup () {
    super.closePopup (this._popup);
    this._form.reset();
    
  }  
}  