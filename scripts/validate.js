const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'}


const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {    
   showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {    
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  
  inputElement.classList.add(`${selectors.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${selectors.errorClass}`);
};

const hideInputError = (formElement, inputElement) => {  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  
  inputElement.classList.remove(`${selectors.inputErrorClass}`);
  errorElement.classList.remove(`${selectors.errorClass}`);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {  
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {  
  if (hasInvalidInput(inputList)) {    
    buttonElement.classList.add(`${selectors.inactiveButtonClass}`);
    buttonElement.setAttribute("disabled", true);
  } else {    
    buttonElement.classList.remove(`${selectors.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {  
  const inputList = Array.from(formElement.querySelectorAll(`${selectors.inputSelector}`));
  const buttonElement = formElement.querySelector(`${selectors.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {    
    inputElement.addEventListener('input', () => {      
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (selectors) => {  
  const formList = Array.from(document.querySelectorAll(`${selectors.formSelector}`));  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {      
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(selectors);