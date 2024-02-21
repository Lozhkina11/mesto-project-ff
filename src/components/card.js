import { openModal, closeModal } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;

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

const placesItems = document.querySelectorAll(".places__item");
const popupImage = document.querySelector(".popup_type_image");

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

export { createCard, deleteCard, addCloseEventListeners };
