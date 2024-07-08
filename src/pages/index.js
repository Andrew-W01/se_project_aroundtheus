import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import Api from "../components/Api.js";

/*=============================================
=            wrapper            =
=============================================*/
const profileEditModal = document.querySelector("#profileEditModal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");

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
=            server request            =
=============================================*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "44a613ee-49a5-4945-992f-d05e72aa4852",
    "Content-Type": "application/json",
  },
});

let cardList;
let userInfo;

api
  .loadPageResults()
  .then(([userData]) => {
    cardList = new Section(
      {
        items: initialCards,
        renderer: createCard,
      },
      ".cards__list"
    );
    cardList.renderItems();
    userInfo = new UserInfo(
      ".profile__title",
      ".profile__description",
      ".profile__image"
    );
    userInfo.setUserInfo(userData);
  })
  .catch(console.error);

/*=============================================
=           Create Cards          =
=============================================*/
//fetchnewcard
function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handlePreviewPicture,
    handleDeleteClick,
    handleLikeClick
  );
  return cardElement.getView();
}

/*=============================================
=           profile Info            =
=============================================*/

const profileImagePopupForm = new PopupWithForm(
  "#picture-modal",
  handleProfileEditSubmit
);
profileImagePopupForm.setEventListeners();

const profileImageEditButton = document.querySelector(
  ".profile-image__edit-button"
);

profileImageEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  profileImagePopupForm.open();
  addFormValidator.disableButton();
});

function handleProfileEditSubmit(userData) {
  profileImagePopupForm.open(true);
  api
    .fetchEditProfile(userData)
    .then(() => {
      userInfo.setUserInfo(userData);
      profileImagePopupForm.close();
    })
    .catch((err) => console.error(err))
    .finally(() => profileImagePopupForm.close(false));
}

/*=============================================
=            section            =
=============================================*/

function handleAddCardEditSubmit(cardData) {
  const name = cardData.title;
  const link = cardData.url;
  cardList.addItem({ name, link });
  addFormValidator.disableButton();
  cardPopupForm.close();
  addCardFormElement.reset();
}

/*=============================================
=            Image            =
=============================================*/

const popupWithImage = new PopupWithImage("#preview-picture-modal");
popupWithImage.setEventListeners();

function handlePreviewPicture(cardData) {
  popupWithImage.open(cardData);
}

/*=============================================
=            Form            =
=============================================*/

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

//fetcheditprofile
profileEditButton.addEventListener("click", () => {
  profilePopupForm.open();
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  editFormValidator.disableButton();
});
addNewCardButton.addEventListener("click", () => cardPopupForm.open());

/*=============================================
=            popup confirmation            =
=============================================*/
const deleteConfirmPopup = new PopupWithConfirmation("#confirm-modal");
deleteConfirmPopup.setEventListeners();

function handleDeleteClick(cardElement) {
  deleteConfirmPopup.open();

  deleteConfirmPopup.setSubmitAction(() => {
    deleteConfirmPopup.open(true);
    api
      .fetchDeleteCard(cardElement.getId())
      .then(() => {
        cardElement.removeCard();
        deleteConfirmPopup.close();
      })
      .catch(console.error)
      .finally(() => deleteConfirmPopup.close(false));
  });
}

function handleLikeClick(cardElement) {
  if (cardElement.getLikes() === true) {
    api
      .dislikeCard(cardElement.getId())
      .then((res) => {
        cardElement.renderLikes(res.isLiked);
      })
      .catch(console.error);
  } else {
    api
      .likeCard(cardElement.getId())
      .then((res) => {
        cardElement.renderLikes(res.isLiked);
      })
      .catch(console.error);
  }
}

/*=============================================
=            validators            =
=============================================*/

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
