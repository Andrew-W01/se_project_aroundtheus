import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelector(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  // close() {
  //   this._popupForm.reset();
  //   super.close();
  // }

  _getInputValues() {
    const formInputs = {};
    this._inputList.forEach((input) => {
      formInputs[input.name] = input.value;
    });
    return formInputs;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const userInfo = this._getInputValues();
      this._handleFormSubmit(userInfo);
      evt.target.reset();
    });
  }
}

// index.js
// const newCardPopup = new PopupWithForm("#profileEditModal", () => {});
// newCardPopup.open();

// newCardPopup.close();
