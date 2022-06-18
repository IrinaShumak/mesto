export class FormValidator {
  constructor(criteria, formElement) {
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(`${criteria.inputSelector}`));
    this._buttonElement = formElement.querySelector(`${criteria.submitButtonSelector}`);
    this._inactiveButtonClass = criteria.inactiveButtonClass;
    this._inputErrorClass = criteria.inputErrorClass;
    this._errorClass = criteria.errorClass;
  }
    
    _checkInputValidity (inputElement) {
      if (!inputElement.validity.valid) {    
       this._showInputError(inputElement);
      } else {    
        this._hideInputError(inputElement);
      }
    }; 
    
    _showInputError (inputElement) {  
      this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);  
      inputElement.classList.add(`${this._inputErrorClass}`);
      this._errorElement.textContent = inputElement.validationMessage;
      this._errorElement.classList.add(`${this._errorClass}`);
    };
    
    _hideInputError (inputElement) {  
      this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);  
      inputElement.classList.remove(`${this._inputErrorClass}`);
      this._errorElement.classList.remove(`${this._errorClass}`);
      this._errorElement.textContent = '';
    }; 
    
    _hasInvalidInput () {  
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

    _diasbleSaveButton () {
      this._buttonElement.classList.add(`${this._inactiveButtonClass}`);
      this._buttonElement.setAttribute("disabled", true);
    }

    _enasbleSaveButton () {
      this._buttonElement.classList.remove(`${this._inactiveButtonClass}`);
      this._buttonElement.removeAttribute('disabled');
    }

    _toggleButtonState () {  
      if (this._hasInvalidInput()) {   
        this._diasbleSaveButton();    
      } else {    
        this._enasbleSaveButton ();
      }
    }; 
    
    _setEventListeners () {        
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {    
        inputElement.addEventListener('input', () => {      
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }; 
    
    enableValidation () {        
        this._formElement.addEventListener('submit', (evt) => {      
          evt.preventDefault();
          this._diasbleSaveButton();
        });        
        this._setEventListeners();        
    };     
};