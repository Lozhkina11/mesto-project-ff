import { addLike, deleteMyCard, removeLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function like(evt, cardId, likesCount) {
 
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.classList.add("card__like-button_is-active");
    addLike(cardId).then((data) => {
      likesCount.textContent = data.likes.length;
    });
  }
   else {
    evt.target.classList.remove("card__like-button_is-active");
    removeLike(cardId).then((data) => {
      likesCount.textContent = data.likes.length;
    });
  }
}
function deleteCard(card, cardId) {
  deleteMyCard(cardId); // удаление карточки в бд
  card.remove(); // удаление карточки в DOM
}
function createCard(
  isMyCard,
  title,
  linkImg,
  countLikes,
  openPopupListener,
  like,
  deleteCard,
  cardId,
  isMyLike,
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const likesCount = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector(".card__like-button");

  if (!isMyCard) {
    buttonDelete.remove();
  }

  if(isMyLike){
    likeButton.classList.add('card__like-button_is-active')
  }
  cardTitle.textContent = title;
  cardImage.src = linkImg;
  cardImage.title = "Картинка, которая описывает место";
  likesCount.textContent = countLikes;

  

  // likeButton.addEventListener("click", like);
  likeButton.addEventListener("click", (event) =>
    like(event, cardId, likesCount)
  );

  const img = cardElement.querySelector(".card__image");

  img.addEventListener("click", openPopupListener);

  buttonDelete.addEventListener("click", (event) =>
    deleteCard(event.target.closest(".places__item"), cardId)
  );
  return cardElement;
}

// @todo: Функция удаления карточки

const placesItems = document.querySelectorAll(".places__item");
const popupImage = document.querySelector(".popup_type_image");

export { createCard, deleteCard, like };
