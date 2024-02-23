import { openModal, closeModal } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
function like(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
function deleteCard(card) {
  card.remove();
}
function createCard(title, linkImg, openPopupListener, like, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = title;
  cardImage.src = linkImg;
  cardImage.title = "Картинка, которая описывает место";

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", like);
  const img = cardElement.querySelector(".card__image");
  
  img.addEventListener("click", openPopupListener);

  buttonDelete.addEventListener("click", (event) =>
    deleteCard(event.target.closest(".places__item"))
  );
  return cardElement;
}


// @todo: Функция удаления карточки



const placesItems = document.querySelectorAll(".places__item");
const popupImage = document.querySelector(".popup_type_image");

function addCloseEventListeners(overlay) {

  const popupCloseButton = overlay.querySelector(".popup__close");

  popupCloseButton.addEventListener("click", function (event) {
    closeModal(overlay); // Скрываем при клике на кнопку
  });

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeModal(overlay); // Скрываем вне области окна
    }
  });
}
function keyHandler(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector('.popup_is-opened')); // Esc
  }
}

export { createCard, deleteCard, addCloseEventListeners, like, keyHandler};
