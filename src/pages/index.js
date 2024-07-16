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
const avatarFormElement = document.querySelector("#change-profile-form");

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
    authorization: "3235a097-fe3d-431f-b680-2a5fa7b7897e",
    "Content-Type": "application/json",
  },
});

let cardList;
let userInfo;

api
  .loadPageResults()
  .then(([card, userData]) => {
    cardList = new Section(
      {
        items: [...card],
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
    userInfo.setUserInfo({ title: userData.name, description: userData.about });
    userInfo.setUserImage(userData.avatar);
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

function handleProfileEditSubmit(userData) {
  profilePopupForm.setLoading(true);
  api
    .fetchEditProfile(userData)
    .then(() => {
      userInfo.setUserInfo({
        title: userData.title,
        description: userData.description,
      });
      profilePopupForm.close();
    })
    .catch((err) => console.error(err))
    .finally(() => profilePopupForm.setLoading(false));
}

/*=============================================
=            profile image edit            =
=============================================*/

const profileImagePopupForm = new PopupWithForm(
  "#picture-modal",
  handleProfilePictureEdit
);
profileImagePopupForm.setEventListeners();

const profileImageEditButton = document.querySelector(
  ".profile-image__edit-button"
);

const form = document.querySelector("#change-profile-form");
profileImageEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  form.reset;
  profileImagePopupForm.open();
  addFormValidator.disableButton();
});

function handleProfilePictureEdit(userData) {
  profileImagePopupForm.setLoading(true);
  api
    .fetchProfilePicture(userData.profileurl)
    .then((userData) => {
      avatarFormElement.reset();
      profileImagePopupForm.close();
      avatarFormValidator.disableButton();
      userInfo.setUserImage(userData.avatar);
    })
    .catch(console.error)
    .finally(() => {
      profileImagePopupForm.setLoading(false);
    });
}

/*=============================================
=            new card            =
=============================================*/

const cardPopupForm = new PopupWithForm(
  "#add-card-modal",
  handleNewCardFormSubmit
);
cardPopupForm.setEventListeners();

function handleNewCardFormSubmit(userInfo) {
  cardPopupForm.setLoading(true);
  api
    .fetchNewCard(userInfo)
    .then((res) => {
      cardList.addItem(res);
    })
    .then(() => {
      addCardFormElement.reset();
      addFormValidator.disableButton();
      cardPopupForm.close();
    })
    .catch(console.error)
    .finally(() => cardPopupForm.setLoading(false));
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
    deleteConfirmPopup.setLoading(true);
    api
      .fetchDeleteCard(cardElement.getId())
      .then(() => {
        cardElement.removeCard();
        deleteConfirmPopup.close();
      })
      .catch(console.error)
      .finally(() => deleteConfirmPopup.setLoading(false));
  });
}

/*=============================================
=            like and dislike            =
=============================================*/

function handleLikeClick(cardElement) {
  if (cardElement.getLikes()) {
    api
      .fetchDisLikeCard(cardElement.getId())
      .then((res) => {
        cardElement.renderLikes(res.isLiked);
        cardElement.isLiked = res.isLiked;
      })
      .catch(console.error);
  } else {
    api
      .fetchLikeCard(cardElement.getId())
      .then((res) => {
        cardElement.renderLikes(res.isLiked);
        cardElement.isLiked = res.isLiked;
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

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarFormElement
);
avatarFormValidator.enableValidation();
