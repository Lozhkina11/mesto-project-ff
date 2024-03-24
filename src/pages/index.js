import("../pages/index.css");
import { createCard, deleteCard, like } from "../components/card.js";
import {
  openModal,
  closeModal,
  addCloseEventListeners,
  keyHandler,
} from "../components/modal.js";

import {
  addCard,
  getCards,
  updateUserAvatar,
  updateUserInfo,
  userAvatar,
  userInfo,
} from "../components/api.js";
import { clearValidation, enableValidation } from "../components/validation.js";


function showLoader(usingButton, loaderText) {
  const targetButton = document.querySelector(usingButton);
  targetButton.textContent = loaderText;
}



const placesList = document.querySelector(".places__list");


// Открытие модалки с картинкой
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
const descriptionElement = document.querySelector(".profile__description")
const profileImage = document.querySelector(".profile__image");


Promise.all([userInfo(), getCards()])
.then(([userInfo, initialCards]) => {
  const newName = userInfo.name;
  const newDescription = userInfo.about;
  nameElement.textContent = newName;
  descriptionElement.textContent = newDescription;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`
  nameInput.value = "";
  jobInput.value = "";
 
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


})
.catch((error)=> console.error('Look at this Error ===>', error))

const profileEditButton = document.querySelector(".profile__edit-button"); // оверлей
const popupEdit = document.querySelector(".popup_type_edit"); // мод.окно

const profileButton = document.querySelector(".profile__add-button"); // оверлей карточки
const popupAddCard = document.querySelector(".popup_type_new-card"); // карточка

const popupImage = document.querySelector(".popup_type_image");

profileEditButton.addEventListener("click", function (event) {
  openModal(popupEdit);
  nameInput.value = nameElement.textContent;
  jobInput.value = descriptionElement.textContent;
  const formElement = popupEdit.querySelector(".popup__form")
  clearValidation(formElement)
  
});

profileButton.addEventListener("click", function (event) {
  openModal(popupAddCard); // Показываем при клике на кнопку
});

const avatarUpdateButton = document.querySelector(".popup__update");

const popupAvatarEditForm = document.querySelector(".popup_avatar");
avatarUpdateButton.addEventListener("click", function (event) {
  
  openModal(popupAvatarEditForm);
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

const addCardPopupForm = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const updateAvatarPopupForm = document.querySelector(".popup_avatar");

const cardNameInput = addCardPopupForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = addCardPopupForm.querySelector(".popup__input_type_url");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  showLoader("#img-save-btn", "Сохранение...");
  addCard(cardNameInput.value, cardLinkInput.value)
    .then((data) => {
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
    })
    .catch((err) => console.error("Ошибка!", err))
    .finally(() => showLoader("#img-save-btn", "Сохранить"));
}
const avatarInput = document.querySelector(".popup__input_type_avatar");
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
  inputSelector: ".popup__input",
  activeButtonClass: "active-button",
  errorClass: "error",
  inputErrorClass: "input-error",
  inactiveButtonClass: "inactive-button",
};

const formElements = document.querySelectorAll(".popup__form");

formElements.forEach((formElement) => {
  const formValidator = enableValidation(validationConfig, formElement);
});

updateAvatarPopupForm.addEventListener("submit", handleAvatarFormSubmit);
