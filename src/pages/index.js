import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

/*=============================================
=            wrapper            =
=============================================*/
const profileEditModal = document.querySelector("#profileEditModal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardsWrap = document.querySelector(".cards__list");

/*=============================================
=             Buttons and other DOM nodes            =
=============================================*/

const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector("#profile-edit-button");

/*=============================================
=            form data            =
=============================================*/
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/*=============================================
=           functions            =
=============================================*/

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handlePreviewPicture
  );
  return cardElement.getView();
}

/*=============================================
=            new class code         =
=============================================*/
//user info
const userInfo = new UserInfo(".profile__title", "profile__description");

function handleProfileEditSubmit(UserData) {
  profilePopupForm.close();
  userInfo.setUserInfo(UserData);
  // e.preventDefault();
  // UserInfo.textContent = profileTitleInput.value;
  // userInfo.textContent = profileDescriptionInput.value;
  // closeModal(profileEditModal);
  // profileEditForm.addEventListener("submit", handleProfileEditSubmit);
}
//section
const cardList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);
cardList.renderItems();

function handleAddCardEditSubmit(userInfo) {
  const name = userInfo.value;
  const link = userInfo.value;
  cardList.addItem({ link, name });
  addFormValidator.disableButton();
  cardPopupForm.close();
  addCardFormElement.reset();
}
//image
const popupWithImage = new PopupWithImage("#preview-picture-modal");
popupWithImage.setEventListeners();

function handlePreviewPicture(cardData) {
  popupWithImage.open(cardData);
}

//form
const profilePopupForm = new PopupWithForm(
  "#profileEditModal",
  handleProfileEditSubmit
);
profilePopupForm.setEventListeners();

const cardPopupForm = new PopupWithForm(
  "#add-card-modal",
  handleAddCardEditSubmit
);
cardPopupForm.setEventListeners();

profileEditButton.addEventListener("click", () => {
  profilePopupForm.open();
  profileTitleInput.value = userInfo.textContent;
  profileDescriptionInput.value = userInfo.textContent;
  // openModal(profileEditModal);
  editFormValidator.disableButton();
});
addNewCardButton.addEventListener("click", () => cardPopupForm.open());

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

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addFormValidator.enableValidation();
