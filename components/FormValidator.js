export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._errorclass = settings.errorclass;
    this._form = formEl;
  }

  _showInputError(inputEl) {
    this._errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(errorclass);
  }
  _hideInputError(inputEl) {
    this._errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(errorclass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(inputEl)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _hasInvalidInput(inputEl) {
    return !inputList.every((inputEl) => this._validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!this._validity.valid) {
      return showInputError(inputEl);
    }
    hideInputError(inputEl);
  }

  _setEventListeners() {
    this._inputEls = [...formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(formEl, inputEl, options);
        this._toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._formEls = [...document.querySelectorAll(this._options.inputSelector)];
    this._formEls.forEach((formEl) => {
      this._formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });
    });
  }
}
