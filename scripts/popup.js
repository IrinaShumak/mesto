const popupOpenBtn = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close');

popupOpenBtn.addEventListener('click', function(event) {
  popup.classList.add('popup_opened')
});

popupCloseBtn.addEventListener('click', function(event) {
  popup.classList.remove('popup_opened')
});

popup.addEventListener('click', function(event) {
  if (event.target == event.currentTarget) {
    popup.classList.remove('popup_opened');
  }  
});

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    let profileName = document.querySelector('.profile-info__name');
    profileName.textContent = nameInput.value;
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);