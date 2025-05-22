// Slider 
let tabs = document.querySelectorAll('.guide_tab');
let contents = document.querySelectorAll('.guide_content');
let currentIndex = 0;
let intervalId;

function showTab(index) {
  for (let i = 0; i < contents.length; i++) {
    if (i === index) {
      contents[i].classList.add('active');
      tabs[i].classList.add('active');
    } 
    else {
      contents[i].classList.remove('active');
      tabs[i].classList.remove('active');
    }
  }
  currentIndex = index;
}

function startAutoSlide() {
  intervalId = setInterval(function() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= tabs.length) {
      nextIndex = 0;
    }
    showTab(nextIndex);
  }, 3000);
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function() {
    clearInterval(intervalId);
    showTab(i);
    startAutoSlide();
  });
}

showTab(0);
startAutoSlide();


// card switcher
const card = document.getElementById('card');
const prevBtn = document.getElementById('prevButton');
const nextBtn = document.getElementById('nextButton');
let items = [];
let currentItemIndex = 0;

async function fetchItems() {
  try {
    const response = await fetch('https://minecraft-api.vercel.app/api/items');
    items = await response.json();
    showCard(currentItemIndex);
  } 
  catch (error) {
    card.textContent = 'Ошибка загрузки данных';
    console.error(error);
  }
}

function showCard(index){
  const item = items[index];
  if(!item) return;
    card.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <h3>${item.name}</h3>
    <p>${item.description || 'Описание отсутствует'}</p>
  `;
}
prevBtn.addEventListener('click', () => {
  currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
  showCard(currentItemIndex);
}); 
nextBtn.addEventListener('click', () => {
  currentItemIndex = (currentItemIndex + 1) % items.length;
  showCard(currentItemIndex);
});
fetchItems();