//
//
//
//this is just used to compare my code side by side and to run test
//
//
//
//
//
//
//
//
//
//

// class FormValidator {
//   constructor(settings, formEl) {
//     this._inputSelector = settings.inputSelector;
//     this._submitButtonSelector = settings.submitButtonSelector;
//     this._inputErrorClass = settings.inputErrorClass;
//     this._inactiveButtonClass = settings.inactiveButtonClass;
//     this._errorclass = settings.errorclass;
//     this._form = formEl;
//   }

//   _showInputError(inputEl) {
//    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
//     inputEl.classList.add(this._inputErrorClass);
//     errorMessageEl.textContent = inputEl.validationMessage;
//     errorMessageEl.classList.add(this._errorclass);
//   }

//   // this._errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   // inputEl.classList.add(this._inputErrorClass);
//   //this._errorMessageEl.textContent = inputEl.validationMessage;
//   //this._errorMessageEl.classList.add(errorclass);

//   _hideInputError(inputEl) {
//     const errorMessageEl =this._formEl.querySelector(`#${inputEl.id}-error`);
//     this._formEl.classList.remove(this._inputErrorClass);
//     errorMessageEl.textContent = "";
//     errorMessageEl.classList.remove(this._errorclass);

//     console.log(this._errorMessageEl);
//   }

//   _toggleButtonState() {
//     if (this._hasInvalidInput()) {
//       submitButton.classList.add(this._inactiveButtonClass);
//       submitButton.disabled = true;
//     } else {
//       submitButton.classList.remove(this._inactiveButtonClass);
//       submitButton.disabled = false;
//     }
//   }

//   _hasInvalidInput() {
//     return this._inputEls.some((inputEl) => !inputEl.validity.valid);
//   }

//   _checkInputValidity(inputEl) {
//     if (!this._validity.valid) {
//       return showInputError(inputEl);
//     }
//     hideInputError(inputEl);
//   }

//   _setEventListeners() {
//     this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
//     this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
//     this._inputEls.forEach((inputEl) => {
//       inputEl.addEventListener("input", (e) => {
//         this._checkInputValidity(formEl);
//         this._toggleButtonState();
//       });
//     });
//   }

//   enableValidation() {
//     this._formEl.addEventListener("submit", (e) => {
//       e.preventDefault();
//     });
//     this._setEventListeners();
//   }
// }

// export default FormValidator;

//
