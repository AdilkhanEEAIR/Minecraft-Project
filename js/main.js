const factButton = document.getElementById('factBtn');
const themeToggleButton = document.getElementById('themeBtn');
const factDisplay = document.getElementById('factDisplay');
const body = document.body;

const facts = [
    "Самая первая версия Minecraft была создана всего за 6 дней.",
    "Крипер появился из-за ошибки в коде, когда разработчик хотел создать свинью.",
    "В Minecraft можно найти редкую структуру — «Заброшенный шахтный туннель» под землёй.",
    "Имя «Minecraft» сочетает в себе два слова: «Mine» (добывать) и «Craft» (создавать).",
    "В Краю можно найти города Края с парящими кораблями и редкой бронёй — элитрой.",
    "Если переименовать овцу в 'jeb_', она будет переливаться всеми цветами.",
    "Minecraft официально доступен на более чем 20 платформах, включая VR и Raspberry Pi.",
    "Зомби могут держать предметы и не исчезать, если что-то у них в руках.",
    "На глубине мира можно найти древние руины с блоками незерита — самым прочным материалом.",
    "Есть особый сид, где ты появляешься рядом с деревней, храмом и крепостью одновременно.",
    "Если моб держит шлем, он не сгорит на солнце — как в случае со скелетом или зомби.",
    "На грибном острове никогда не появляются враждебные мобы — даже ночью.",
    "Вода не может быть установлена в Нижнем мире без модов или команд.",
    "С помощью командного блока можно телепортироваться, менять погоду и даже создавать мини-игры.",
    "В Minecraft Земля — это один из немногих блоков, который существует в трёх типах: грязь, дерн и подзол.",
    "Жители могут устраивать собрания у колодца в центре деревни по вечерам.",
    "Если гром ударит в свинью, она превратится в свинозомби (на старых версиях).",
    "Minecraft получил премию BAFTA как лучшая семейная и детская игра.",
    "Есть способ сделать портал в Край с помощью команд, даже если ты не нашёл крепость.",
    "У Minecraft есть собственная обучающая версия — Minecraft: Education Edition."
  ];
  
factButton.addEventListener('click', () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factDisplay.innerHTML = `Случайный факт: ${randomFact}`;
});
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
});

// Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});
showSlide(currentSlide);
const slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Video
const videoSlides = document.querySelectorAll('.video-slide');
const prevVideo = document.getElementById('prevVideo');
const nextVideo = document.getElementById('nextVideo');
let currentVideo = 0;

function showVideo(index) {
    videoSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

prevVideo.addEventListener('click', () => {
    currentVideo = (currentVideo - 1 + videoSlides.length) % videoSlides.length;
    showVideo(currentVideo);
});

nextVideo.addEventListener('click', () => {
    currentVideo = (currentVideo + 1) % videoSlides.length;
    showVideo(currentVideo);
});

// setInterval(() => {
//     currentVideo = (currentVideo + 1) % videoSlides.length;
//     showVideo(currentVideo);
// }, 5000);
// showVideo(currentVideo);