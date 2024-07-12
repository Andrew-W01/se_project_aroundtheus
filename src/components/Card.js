export default class Card {
  constructor(
    cardData,
    cardSelector,
    handlePreviewPicture,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._cardSelector = cardSelector;
    this._name = cardData.name;
    this._link = cardData.link;
    this._handlePreviewPicture = handlePreviewPicture;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardId = cardData._id;
    this._isLiked = cardData._isLiked;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this);
      });
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    this._cardImageEl.addEventListener("click", () => {
      this._handlePreviewPicture({ name: this._name, link: this._link });
    });
  }

  renderLikes(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked === true) {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    } else {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    }
  }

  getLikes() {
    return this._isLiked;
  }

  removeCard() {
    this._cardElement.remove();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
  getId() {
    return this._cardId;
  }
}
