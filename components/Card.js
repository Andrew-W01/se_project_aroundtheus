class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardelement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._cardelement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleTrashButton();
      });
    this._cardelement
      .querySelector(".card__image")
      .addEventListener("click", (e) => {
        this._handlePreviewPicture(e);
      });
  }

  _handleLikeButton = () => {
    this._cardelement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  };

  _handleTrashButton = () => {
    this._cardelement.remove();
  };

  _handlePreviewPicture(e) {
    previewPictureModalImage.src = e.target.src;
    previewPictureModalImage.alt = e.target.alt;
    previewPictureCaption.textContent = e.target.alt;
    openModal(previewPictureModal);
  }

  _getTemplate() {
    return document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
  }
  getView() {
    this._cardelement = this._getTemplate();

    this._cardelement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._cardelement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
