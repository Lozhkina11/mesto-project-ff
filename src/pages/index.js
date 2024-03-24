import("../pages/index.css");
import { createCard, deleteCard, like } from "../components/card.js";
import {
  openModal,
  closeModal,
  addCloseEventListeners,
} from "../components/modal.js";

import {
  addCard,
  getCards,
  updateUserAvatar,
  updateUserInfo,
  userInfo,
} from "../components/api.js";
import { clearValidation, enableValidation } from "../components/validation.js";

function showLoader(usingButton, loaderText) {
  const targetButton = document.querySelector(usingButton);
  targetButton.textContent = loaderText;
}

const placesList = document.querySelector(".places__list");

function getOpenPopupListener(titleCard, imgSrc) {
  return function (evt) {
    popupImage.querySelector(".popup__caption").textContent = titleCard;
    popupImage.querySelector(".popup__image").setAttribute("src", imgSrc);
    popupImage.querySelector(".popup__image").alt = titleCard;

    openModal(popupImage);
  };
}

const popupForm = document.querySelector(".popup_type_edit .popup__form");
const nameInput = popupForm.querySelector(".popup__input_type_name");
const jobInput = popupForm.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

Promise.all([userInfo(), getCards()])
  .then(([userInfo, initialCards]) => {
    const newName = userInfo.name;
    const newDescription = userInfo.about;
    const userId = userInfo._id;

    nameElement.textContent = newName;
    descriptionElement.textContent = newDescription;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    nameInput.value = "";
    jobInput.value = "";

    for (let i = 0; i < initialCards.length; i += 1) {
      const newCard = createCard(
        initialCards[i].owner._id === userId,
        initialCards[i].name,
        initialCards[i].link,
        initialCards[i].likes.length,
        getOpenPopupListener(initialCards[i].name, initialCards[i].link),
        initialCards[i]._id,
        initialCards[i].likes.some((item) => item._id === userId)
      );
      placesList.appendChild(newCard);
    }
  })
  .catch((error) => console.error("Look at this Error ===>", error));

const profileEditButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

const profileButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");

const updateAvatarPopupForm = document.querySelector(".popup_avatar");

const addCardPopupForm = document.querySelector(".popup__add_card_form");

const cardNameInput = addCardPopupForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = addCardPopupForm.querySelector(".popup__input_type_url");

profileEditButton.addEventListener("click", function (event) {
  openModal(popupEdit);
  nameInput.value = nameElement.textContent;
  jobInput.value = descriptionElement.textContent;
  const formElement = popupEdit.querySelector(".popup__form");
  clearValidation(formElement);
});

profileButton.addEventListener("click", function (event) {
  openModal(popupAddCard);
  const formElement = popupAddCard.querySelector(".popup__form");
  clearValidation(formElement);
  cardNameInput.value = "";
  cardLinkInput.value = "";
});

const avatarUpdateButton = document.querySelector(".popup__update");
const popupAvatarEditForm = document.querySelector(".popup_avatar");
const avatarInput = document.querySelector(".popup__input_type_avatar");

avatarUpdateButton.addEventListener("click", function (event) {
  openModal(popupAvatarEditForm);
  const formElement = popupAvatarEditForm.querySelector(".popup__form");
  clearValidation(formElement);
  avatarInput.value = "";
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  showLoader("#info-save-btn", "Сохранение...");
  updateUserInfo(nameInput.value, jobInput.value)
    .then((data) => {
      const newName = data.name;
      const newDescription = data.about;
      nameElement.textContent = newName;
      descriptionElement.textContent = newDescription;

      nameInput.value = "";
      jobInput.value = "";

      closeModal(popupEdit);
    })
    .catch((err) => console.error("Ошибка!", err))
    .finally(() => showLoader("#info-save-btn", "Сохранить"));
}

popupForm.addEventListener("submit", handleFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  showLoader("#img-save-btn", "Сохранение...");
  addCard(cardNameInput.value, cardLinkInput.value)
    .then((data) => {
      const newCard = createCard(
        true,
        data.name,
        data.link,
        0,
        getOpenPopupListener(data.name, data.link)
      );
      placesList.prepend(newCard);

      cardNameInput.value = "";
      cardLinkInput.value = "";

      closeModal(popupAddCard);
    })
    .catch((err) => console.error("Ошибка!", err))
    .finally(() => showLoader("#img-save-btn", "Сохранить"));
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  showLoader("#avatar-save-btn", "Сохранение...");
  updateUserAvatar(avatarInput.value)
    .then((data) => {
      const newAvatar = data.avatar;
      profileImage.style.backgroundImage = `url(${newAvatar})`;
      avatarInput.value = "";
      closeModal(popupAvatarEditForm);
    })
    .catch((err) => console.error("Ошибка!", err))
    .finally(() => showLoader("#avatar-save-btn", "Сохранить"));
}

addCardPopupForm.addEventListener("submit", handleAddCardFormSubmit);
addCloseEventListeners(popupEdit);
addCloseEventListeners(popupImage);
addCloseEventListeners(popupAddCard);
addCloseEventListeners(popupAvatarEditForm);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

updateAvatarPopupForm.addEventListener("submit", handleAvatarFormSubmit);
