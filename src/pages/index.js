import("../pages/index.css");
import card from "../components/card.js";
import modal from "../components/modal.js";
import { initialCards } from "../scripts/cards.js";

const imageUser = new URL("../images/avatar.jpg", import.meta.url);
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${imageUser})`;

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
let currentCardIndex = 0;

// @todo: Функция создания карточки
function createCard(title, linkImg) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = title;
  cardImage.src = linkImg;
  cardImage.alt = "Картинка, которая описывает место";

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });
  const img = cardElement.querySelector(".card__image");
  img.addEventListener("click", function (evt) {
    const titleCard = cardTitle.textContent;
    popupImage.querySelector(".popup__caption").textContent = titleCard;
    const imgSrc = img.getAttribute("src");

    popupImage.querySelector(".popup__image").setAttribute("src", imgSrc);

    openModal(popupImage);
    addCloseEventListeners(popupImage);
  });

  buttonDelete.addEventListener("click", (event) =>
    deleteCard(event.target.closest(".places__item"))
  );
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i += 1) {
  const newCard = createCard(initialCards[i].name, initialCards[i].link);
  placesList.appendChild(newCard);
}

// редактирование профиля
function openModal(overlay) {
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";

  overlay.classList.add("popup_is-opened"); // добавление плавности на открытие

  // const popup = overlay.querySelector(".popup__content");
  // popup.style.left = "50%";
  // popup.style.top = "50%";
  // popup.style.transform = "translate(-50%, -50%)";
  // popup.style.display = "block";
}

function closeModal(overlay) {
  overlay.classList.remove("popup_is-opened"); //добавление плавности на закрытие
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

function addCloseEventListeners(overlay) {
  function keyHandler(evt) {
    if (evt.key === "Escape") {
      closeModal(overlay); // Esc
      document.removeEventListener("keydown", keyHandler); // Удаляем Esc
    }
  }
  document.addEventListener("keydown", keyHandler);
  const popupCloseButton = overlay.querySelector(".popup__close");

  popupCloseButton.addEventListener("click", function (event) {
    closeModal(overlay); // Скрываем при клике на кнопку
    document.removeEventListener("keydown", keyHandler); // Удаляем Esc
  });

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeModal(overlay); // Скрываем вне области окна
      document.removeEventListener("keydown", keyHandler); // Удаляем Esc
    }
  });
}

const formElement = document.querySelector(".popup_type_edit .popup__form");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__description");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newDescription = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  // const nameElement = document.querySelector(".profile__title");
  // const descriptionElement = document.querySelector(".profile__description");

  // Вставляем новые значения
  nameElement.textContent = newName;
  descriptionElement.textContent = newDescription;

  // Очищаем поля формы после обновления
  nameInput.value = "";
  jobInput.value = "";
  // Вставьте новые значения с помощью textContent

  closeModal(popupEdit);
}

const addCardFormElement = document.querySelector(
  ".popup_type_new-card .popup__form"
);
// Находим поля формы в DOM
const cardNameInput = addCardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = addCardFormElement.querySelector(
  ".popup__input_type_url"
);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(cardNameInput.value, cardLinkInput.value);
  placesList.prepend(newCard);
  // Очищаем поля формы после обновления
  cardNameInput.value = "";
  cardLinkInput.value = "";
  // Вставьте новые значения с помощью textContent

  closeModal(popupAddCard);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
