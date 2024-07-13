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
    this._isLiked = cardData.isLiked;
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
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  getLikes() {
    return this._isLiked;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
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
    this.renderLikes(this._isLiked);
    this._setEventListeners();

    return this._cardElement;
  }
  getId() {
    return this._cardId;
  }
}
