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
    this._likes = cardData.likes;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton(this);
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

  _handleLikeButton = () => {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  };

  _handleDeleteClick = () => {
    this._cardElement.remove();
  };

  isLiked() {
    return this._likes.some((like) => like._id === userId);
  }

  setLikes(likes) {
    this._likes = likes;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  removeCard() {
    this._cardElement.remove();
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
