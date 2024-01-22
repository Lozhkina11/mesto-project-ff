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

  cardTitle.textContent = title;
  cardImage.src = linkImg;

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
placesList.addEventListener("click", function (event) {
  if (event.target.classList.contains("card__delete-button")) {
    const listItem = event.target.closest(".places__item");
    if (listItem) {
      listItem.remove();
    }
  }
});

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i += 1) {
  const newCard = createCard(initialCards[i].name, initialCards[i].link);
  placesList.appendChild(newCard);
}
