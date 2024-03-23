import("../pages/index.css");
import { createCard, deleteCard, like } from "../components/card.js";
import {
  openModal,
  closeModal,
  addCloseEventListeners,
  keyHandler,
} from "../components/modal.js";

import FormValidator from "../components/validation.js";
import {
  addCard,
  getCards,
  updateUserAvatar,
  updateUserInfo,
  userInfo,
} from "../components/api.js";

const imageUser = new URL("../images/avatar.jpg", import.meta.url);
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${imageUser})`;

const placesList = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");

function getOpenPopupListener(titleCard, imgSrc) {
  return function (evt) {
    popupImage.querySelector(".popup__caption").textContent = titleCard;
    popupImage.querySelector(".popup__image").setAttribute("src", imgSrc);
    popupImage.querySelector(".popup__image").alt = titleCard;

    openModal(popupImage);
  };
}
getCards().then((initialCards) => {
  for (let i = 0; i < initialCards.length; i += 1) {
    const newCard = createCard(
      initialCards[i].owner._id.includes("7602a9166d2e2ec83e5c2ca3"),
      initialCards[i].name,
      initialCards[i].link,
      initialCards[i].likes.length,
      getOpenPopupListener(initialCards[i].name, initialCards[i].link),
      like,
      deleteCard,
      initialCards[i]._id,
      initialCards[i].likes.some(
        (item) => item._id === "7602a9166d2e2ec83e5c2ca3"
      )
    );
    placesList.appendChild(newCard);
  }
});

const profileEditButton = document.querySelector(".profile__edit-button"); // оверлей
const popupEdit = document.querySelector(".popup_type_edit"); // мод.окно

// добавление новой фотокарточки
const profileButton = document.querySelector(".profile__add-button"); // оверлей карточки
const popupAddCard = document.querySelector(".popup_type_new-card"); // карточка

//просмотр картинки
const placesItems = document.querySelectorAll(".places__item");
const popupImage = document.querySelector(".popup_type_image");

profileEditButton.addEventListener("click", function (event) {
  openModal(popupEdit);
  nameInput.value = nameElement.textContent;
  jobInput.value = descriptionElement.textContent;
});

profileButton.addEventListener("click", function (event) {
  openModal(popupAddCard); // Показываем при клике на кнопку
});

const avatarUpdateButton = document.querySelector(".popup__update");

// const popupAvatarEditForm = document.querySelector(".popup_avatar");


const popupForm = document.querySelector(".popup_type_edit .popup__form");
// Находим поля формы в DOM
const nameInput = popupForm.querySelector(".popup__input_type_name");
const jobInput = popupForm.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__description");

userInfo().then((data) => {
  // const newName = nameInput.value;
  const newName = data.name;
  const newDescription = data.about;
  // console.log(newDescription);
  nameElement.textContent = newName;
  descriptionElement.textContent = newDescription;

  nameInput.value = "";
  jobInput.value = "";
});
const popupAvatarEditForm = document.querySelector(".popup_avatar");
avatarUpdateButton.addEventListener("click", function (event) {
  
  
  // const avatarInput = document.querySelector(".popup__input_type_avatar");
 
  openModal(popupAvatarEditForm);
  
});

 

function handleFormSubmit(evt) {
  evt.preventDefault();
  updateUserInfo(nameInput.value, jobInput.value).then((data) => {
    // const newName = nameInput.value;
    const newName = data.name;
    const newDescription = data.about;
    // console.log(newDescription);
    nameElement.textContent = newName;
    descriptionElement.textContent = newDescription;

    nameInput.value = "";
    jobInput.value = "";

    closeModal(popupEdit);
  });
}

popupForm.addEventListener("submit", handleFormSubmit);

const addCardPopupForm = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const updateAvatarPopupForm = document.querySelector(".popup_avatar");
// const updateAvatarPopupForm = document.querySelector(".popup__avatar_form");
// const updateAvatarPopupForm = document.querySelector(".popup_avatar.popup__avatar_form");


const cardNameInput = addCardPopupForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = addCardPopupForm.querySelector(".popup__input_type_url");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value).then((data) => {
    const newCard = createCard(
      true,
      cardNameInput.value,
      cardLinkInput.value,
      0,
      getOpenPopupListener(cardNameInput.value, cardLinkInput.value),
      like,
      deleteCard
    );
    placesList.prepend(newCard);

    cardNameInput.value = "";
    cardLinkInput.value = "";

    closeModal(popupAddCard);
  });
}
const avatarInput = document.querySelector(".popup__input_type_avatar");
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  updateUserAvatar(avatarInput.value).then((data) => {
    // console.log(data);
    const newAvatar = data.avatar
    console.log(newAvatar);
    // profileImage.style.backgroundImage= newAvatar
    // // placesList.prepend(newAvatar);

    // avatarInput.value = "";

    closeModal(popupAvatarEditForm);
  });
 
}

addCardPopupForm.addEventListener("submit", handleAddCardFormSubmit);
addCloseEventListeners(popupEdit);
addCloseEventListeners(popupImage);
addCloseEventListeners(popupAddCard);
// addCloseEventListeners(popupAvatarEditForm);

const validationConfig = {
  inputSelector: ".popup__input",
  activeButtonClass: "active-button",
  errorClass: "error",
  inputErrorClass: "input-error",
  inactiveButtonClass: "inactive-button",
};

const formElements = document.querySelectorAll(".popup__form");
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);

  // formValidator.enableValidation();
});

// clearValidation(, validationConfig);


updateAvatarPopupForm.addEventListener("submit", handleAvatarFormSubmit);