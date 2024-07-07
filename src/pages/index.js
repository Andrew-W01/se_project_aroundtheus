import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import popupWithConfirmation from "../components/PopupWithConfirmation.js";
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

// api
//   .getInitialCards()
//   .then((cardData) => {
//     cardList.renderItems(cardData);
//   })
//   .catch((error) => {
//     console.error("Error fetching initial cards:", error);
//   });

let cardList;
let userInfo;

api
  .loadPageResults()
  .then(([cards, userData]) => {
    cardList = new Section(
      {
        items: cards,
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
    handleDeleteClick
  );
  return cardElement.getView();
}

/*=============================================
=            User Info            =
=============================================*/

// const userInfo = new UserInfo(".profile__title", ".profile__description");
// userInfo.setUserInfo(userData);

function handleProfileEditSubmit(userData) {
  profilePopupForm.setLoading(true);
  api
    .fetchEditProfile(userData)
    .then(() => {
      userInfo.setUserInfo(UserData);
      profilePopupForm.close();
    })
    .catch((err) => console.error(err))
    .finally(() => profilePopupForm.setLoading(false));
}

/*=============================================
=            section            =
=============================================*/

// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: createCard,
//   },
//   ".cards__list"
// );
// cardList.renderItems();

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
const deleteConfirmPopup = new popupWithConfirmation("#confirm-modal");
deleteConfirmPopup.setEventListeners();

function handleDeleteClick(card) {
  deleteConfirmPopup.open();

  deleteConfirmPopup.setSubmitAction(() => {
    deleteConfirmPopup.setLoading(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        deleteConfirmPopup.close();
      })
      .catch(console.error)
      .finally(() => deleteConfirmPopup.setLoading(false));
  });
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
