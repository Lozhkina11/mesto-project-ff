function openModal(overlay) {
  overlay.classList.add("popup_is-opened"); // добавление плавности на открытие
    document.addEventListener('keydown', keyHandler);
}

function closeModal(overlay) {
  overlay.classList.remove("popup_is-opened"); //добавление плавности на закрытие
  document.removeEventListener('keydown', keyHandler);
}
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


export { openModal, closeModal, addCloseEventListeners, keyHandler};
