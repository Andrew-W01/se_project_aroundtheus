class Card {
  constructor(cardData, cardSelector, getCardElement) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._getCardElement = getCardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleTrashButton();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", (e) => {
        this._handlePreviewPicture(e);
      });
  }

  _handleLikeButton = () => {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  };

  _handleTrashButton = () => {
    this._element.remove();
  };

  _handlePreviewPicture(e) {
    previewPictureModalImage.src = e.target.src;
    previewPictureModalImage.alt = e.target.alt;
    previewPictureCaption.textContent = e.target.alt;
    openModal(previewPictureModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  getView() {
    this._element = this._getTemplate();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
