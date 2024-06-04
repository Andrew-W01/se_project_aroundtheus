function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeWithEscape);
  modal.addEventListener("mousedown", closePopupOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeWithEscape);
  modal.removeEventListener("mousedown", closePopupOverlay);
}

function closeWithEscape(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".modal_opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // this._element
    //   .querySelector(".card__like-button")
    //   .addEventListener("click", () => {
    //     likeButton.classList.toggle("card__like-button_active");
    //   });
    // this._element
    //   .querySelector(".card__trash-button")
    //   .addEventListener("click", () => {
    //     cardElement.remove();
    //   });
    // this._element
    //   .querySelector(".card__image")
    //   .addEventListener("click", () => {});

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton);
    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._handleTrashButton);
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleCardImageEl);
  }
  _handleLikeButton = () => {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  };

  _handleTrashButton = () => {
    this._cardElement.remove();
  };

  _handlePreviewPicture() {
    previewPictureModalImage.src = e.target.src;
    previewPictureModalImage.alt = e.target.alt;
    previewPictureCaption.textContent = e.target.alt;
    openModal(previewPictureModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNone(true);
  }

  getView() {
    this._element = this._getTemplate();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
  }
}

export default Card;
