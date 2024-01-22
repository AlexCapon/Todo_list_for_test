import closeModal from "./closeModal";

export default function openModal(id) {
  const modal = document.querySelector(`#${id}`);
  modal.showModal();
  document.addEventListener('click', ({ target }) => {
    if (target.nodeName === 'DIALOG') {
      closeModal(id);
    }
  });
}