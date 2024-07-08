import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("#confirm-form");
    this._handleFormSubmit = this._popupForm.querySelector(".modal__button");
    this._submitButtonValue = this._handleFormSubmit.textContent;
  }

  setSubmitAction(action) {
    this._submitAction = action;
  }

  setLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._handleFormSubmit.textContent = loadingText;
    } else {
      this._handleFormSubmit.textContent = this._submitButtonValue;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitAction();
    });
  }
}
