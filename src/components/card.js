import { addLike, deleteMyCard, removeLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function like(evt, cardId, likesCount) {
    
  const likeMethod = evt.target.classList.contains("card__like-button_is-active") ? removeLike : addLike;

  likeMethod(cardId) 
        .then((data) => {
           likesCount.textContent = data.likes.length; 
           evt.target.classList.toggle("card__like-button_is-active") 
        })
.catch(err => console.log(err));

}
function deleteCard(card, cardId) {
  deleteMyCard(cardId).then(()=> card.remove());
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
  } else{
    buttonDelete.addEventListener("click", (event) =>
    deleteCard(event.target.closest(".places__item"), cardId)
  );
  }

  if(isMyLike){
    likeButton.classList.add('card__like-button_is-active')
  }
  cardTitle.textContent = title;
  cardImage.src = linkImg;
  cardImage.title = "Картинка, которая описывает место";
  likesCount.textContent = countLikes;

  likeButton.addEventListener("click", (event) =>
    like(event, cardId, likesCount)
  );

  const img = cardElement.querySelector(".card__image");

  img.addEventListener("click", openPopupListener);

  return cardElement;
}



export { createCard, deleteCard, like };
