import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImagePicture =
      this._popupElement.querySelector(".modal__picture");
    this._previewImageText =
      this._popupElement.querySelector(".modal_sub-heading");
  }

  open(data) {
    this._previewImagePicture.src = data.link;
    this._previewImagePicture.alt = data.name;
    this._previewImageText.textContent = data.name;
    super.open();
  }
}
