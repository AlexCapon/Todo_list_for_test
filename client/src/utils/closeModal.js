export default function closeModal(id) {
  const modal = document.querySelector(`#${id}`);
  modal.setAttribute('closing', '');
  modal.addEventListener(
    'animationend',
    () => {
      modal.removeAttribute('closing');
      modal.close();
    },
    { once: true },
  );
}
