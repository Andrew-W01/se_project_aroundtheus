import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const cardSelector = document.querySelector("#card-template");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

/*=============================================
=            wrapper            =
=============================================*/
const profileEditModal = document.querySelector("#profileEditModal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardsWrap = document.querySelector(".cards__list");
const previewPictureModal = document.querySelector("#preview-picture-modal");

/*=============================================
=             Buttons and other DOM nodes            =
=============================================*/

const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addcardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const previewPictureCloseButton = previewPictureModal.querySelector(
  "#picture_close-button"
);

/*=============================================
=            form data            =
=============================================*/

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModal.querySelector(".modal__input_type_url");

/*=============================================
=           functions            =
=============================================*/

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeWithEscape);
  modal.removeEventListener("mousedown", closePopupOverlay);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeWithEscape);
  modal.addEventListener("mousedown", closePopupOverlay);
}

function renderCard(cardData, wrapper) {
  // const cardElement = getCardElement(cardData);
  const card = new Card(cardData, cardSelector);
  wrapper.prepend(card.getView());
}

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const trashButton = cardElement.querySelector(".card__trash-button");

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   trashButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

// cardImageEl.addEventListener("click", (e) => {
//   openModal(previewPictureModal);
//   const previewPictureModalImage =
//     previewPictureModal.querySelector(".modal__picture");
//   const previewPictureCaption =
//     previewPictureModal.querySelector(".modal_sub-heading");
//   previewPictureCaption.textContent = e.target.alt;
//   previewPictureModalImage.src = e.target.src;
//   previewPictureModalImage.alt = e.target.alt;
// });

// cardImageEl.setAttribute("src", cardData.link);
// cardImageEl.setAttribute("alt", cardData.name);
// cardTitleEl.textContent = cardData.name;
//   return cardElement;

/*=============================================
=            Event Handlers            =
=============================================*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardEditSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ link, name }, cardsWrap);
  closeModal(addCardModal);
  addCardFormElement.reset();
}

function closeWithEscape(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".modal_opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

function closePopupOverlay(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

/*=============================================
=            Event Listeners            =
=============================================*/

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

/*=============================================
=            form listeners            =
=============================================*/

addCardFormElement.addEventListener("submit", handleAddCardEditSubmit);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/*=============================================
=            preview image close button            =
=============================================*/

function handleImageClick(cardData) {
  previewInput.src = cardData.link;
  previewInput.alt = cardData.name;
  previewModalDescription.textContent = cardData.name;
  openModal(previewPictureModal);
}

previewPictureCloseButton.addEventListener("click", () => {
  closeModal(previewPictureModal);
});

/*=============================================
=            new card button            =
=============================================*/

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addcardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

/*=============================================
=            validators            =
=============================================*/

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inputErrorClass: "modal__input-error",
  inactiveButtonClass: "modal__button_disabled",
  errorclass: "modal__error",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addFormElement);
addFormValidator.enableValidation();
