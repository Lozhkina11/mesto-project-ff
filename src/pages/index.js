import("../pages/index.css");
import {
  createCard,
  deleteCard,
  addCloseEventListeners,
} from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { initialCards } from "../scripts/cards.js";

const imageUser = new URL("../images/avatar.jpg", import.meta.url);
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${imageUser})`;

const placesList = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
let currentCardIndex = 0;

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i += 1) {
  const newCard = createCard(initialCards[i].name, initialCards[i].link);
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
  addCloseEventListeners(popupEdit);
});

profileButton.addEventListener("click", function (event) {
  openModal(popupAddCard); // Показываем при клике на кнопку
  addCloseEventListeners(popupAddCard); //  Esc
});

const formElement = document.querySelector(".popup_type_edit .popup__form");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
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

formElement.addEventListener("submit", handleFormSubmit);

const addCardFormElement = document.querySelector(".popup_type_new-card .popup__form");

const cardNameInput = addCardFormElement.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardFormElement.querySelector(".popup__input_type_url");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(cardNameInput.value, cardLinkInput.value);
  placesList.prepend(newCard);

  cardNameInput.value = "";
  cardLinkInput.value = "";

  closeModal(popupAddCard);
}

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
