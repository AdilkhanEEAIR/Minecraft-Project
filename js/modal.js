// Модальное окно
const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('#btn-get');
const closeModalButton = document.querySelector('.modal_close');

function openModal() {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const modalInterval = setTimeout(openModal, 7000);
window.addEventListener('scroll', function onScroll() {
  if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener('scroll', onScroll);
  }
});

// Бургер-адаптивка
const burger = document.getElementById('burger');
const menu = document.querySelector('.menu');
burger.addEventListener('click', () => {
    menu.classList.toggle('active');
});