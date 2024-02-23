import("../pages/index.css");
import {
  createCard,
  deleteCard,
  addCloseEventListeners,
  like,
  keyHandler
} from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { initialCards } from "../scripts/cards.js";

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

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i += 1) {
  const newCard = createCard(
    initialCards[i].name,
    initialCards[i].link,
    getOpenPopupListener(initialCards[i].name, initialCards[i].link),
    like,
    deleteCard
  );
  placesList.appendChild(newCard);
}

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

const popupForm = document.querySelector(".popup_type_edit .popup__form");
// Находим поля формы в DOM
const nameInput = popupForm.querySelector(".popup__input_type_name");
const jobInput = popupForm.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__description");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newDescription = jobInput.value;
  nameElement.textContent = newName;
  descriptionElement.textContent = newDescription;

  nameInput.value = "";
  jobInput.value = "";

  closeModal(popupEdit);
}

popupForm.addEventListener("submit", handleFormSubmit);

const addCardPopupForm = document.querySelector(
  ".popup_type_new-card .popup__form"
);

const cardNameInput = addCardPopupForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = addCardPopupForm.querySelector(
  ".popup__input_type_url"
);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    cardNameInput.value,
    cardLinkInput.value,
    getOpenPopupListener(cardNameInput.value, cardLinkInput.value),
    like,
    deleteCard
  );
  placesList.prepend(newCard);

  cardNameInput.value = "";
  cardLinkInput.value = "";

  closeModal(popupAddCard);
}

addCardPopupForm.addEventListener("submit", handleAddCardFormSubmit);
addCloseEventListeners(popupEdit)
addCloseEventListeners(popupImage)
addCloseEventListeners(popupAddCard)


document.addEventListener("keydown", keyHandler);
