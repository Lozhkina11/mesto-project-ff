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
