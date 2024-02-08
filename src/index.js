import ('./pages/index.css');
import {initialCards} from './scripts/cards.js';
const imageUser = new URL('./images/avatar.jpg', import.meta.url);

const profileImage = document.querySelector('.profile__image');
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


  buttonDelete.addEventListener("click", (event) => deleteCard(event.target.closest(".places__item")));
  return cardElement;
}

function addNextCard() {
  const cardData = initialCards[currentCardIndex];
  if (cardData) {
    const newCard = createCard(cardData.name, cardData.link);
    placesList.appendChild(newCard);
    currentCardIndex++;
  } else {
    currentCardIndex = 0;
  }
}

addCardButton.addEventListener("click", function () {
  addNextCard();
});

// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove()
} 

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i += 1) {
  const newCard = createCard(initialCards[i].name, initialCards[i].link);
  placesList.appendChild(newCard);
}

// import arkhyzImage from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
// import chelyabinskOblastImage from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg';
// import ivanovoImage from './ivanovo.jpg';
// import kamchatkaImage from './kamchatka.jpg';
// import kholmogorskyRayonImage from './kholmogorsky-rayon.jpg';
// import baikalImage from './baikal.jpg';

// const initialCards = [
//   {
//     name: "Архыз",
//     link: arkhyzImage,
//   },
//   {
//     name: "Челябинская область",
//     link: chelyabinskOblastImage,
//   },
//   {
//     name: "Иваново",
//     link: ivanovoImage,
//   },
//   {
//     name: "Камчатка",
//     link: kamchatkaImage,
//   },
//   {
//     name: "Холмогорский район",
//     link: kholmogorskyRayonImage,
//   },
//   {
//     name: "Байкал",
//     link: baikalImage,
//   }
// ];
