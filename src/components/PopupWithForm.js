import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, criteria, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;    
    this._form = this._popup.querySelector(formSelector);
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._form.querySelector(`${criteria.submitButtonSelector}`);
    this._initialBtnText = this._submitBtn.textContent;
    this.closePopup = this.closePopup.bind(this);          
  }

  _getInputValues() {    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);    
    return this._formValues;
  }

  renderLoading (isLoading) {
    if (isLoading) {      
      this._submitBtn.textContent = "Сохранение...";      
    } else {
      this._submitBtn.textContent = this._initialBtnText;
    }
  }

  setEventListeners () {
    super.setEventListeners ();   
         
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues(), this.closePopup);      
    }) 
    };
  
  closePopup () {
    super.closePopup ();
    this._form.reset();
    
  }  
}  