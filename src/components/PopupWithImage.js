import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImagePicture =
      this._popupElement.querySelector(".modal__picture");
    this._previewImageText =
      this._popupElement.querySelector(".modal_sub-heading");
  }

  open(cardData) {
    this._previewImagePicture.src = cardData.link;
    this._previewImagePicture.alt = cardData.name;
    this._previewImageText.textContent = cardData.name;
    super.open();
  }
}
