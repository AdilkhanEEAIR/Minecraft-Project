// Валидация почты
let form = document.getElementById("recipeEmailForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let emailInput = document.getElementById("recipeEmailInput");
    let message = document.getElementById("recipeEmailMessage");
    let email = emailInput.value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    message.style.fontSize = "22px";
    message.style.fontWeight = "600";
    message.style.textShadow = "1px 1px 2px black";
    if (emailRegex.test(email)) {
        message.textContent = "Рецепты отправлены на вашу почту!";
        message.style.color = "yellow";
    } 
    else {
        message.textContent = "Ошибка! Введите правильный адрес электронной почты!";
        message.style.color = "red";
  }
});

// Таймер
let startBtn = document.getElementById('startGameBtn');
let stopBtn = document.getElementById('stopGameBtn');
let resetBtn = document.getElementById('resetGameBtn');
let diamondBlock = document.getElementById('diamond-block');
let timeEl = document.getElementById('time');
let scoreEl = document.getElementById('score');
let time = 10;
let score = 0;
let intervalId;
let running = 0;

function tick() {
  time = time - 1;
  timeEl.textContent = time;
  if (time <= 0) {
    clearInterval(intervalId);
    alert('Время вышло! Ваш счёт: ' + score);
    running = 0;
  }
}

function startGame() {
  if (running === 1) return;
  time = 10;
  score = 0;
  timeEl.textContent = time;
  scoreEl.textContent = score;
  running = 1;
  intervalId = setInterval(tick, 1000);
}

function stopGame() {
  if (running === 1) {
    clearInterval(intervalId);
    running = 0;
  } else {
    running = 1;
    intervalId = setInterval(tick, 1000);
  }
}

function resetGame() {
  clearInterval(intervalId);
  time = 10;
  score = 0;
  timeEl.textContent = time;
  scoreEl.textContent = score;
  running = 0;
}

diamondBlock.addEventListener('click', function() {
  if (running === 1) {
    score = score + 1;
    scoreEl.textContent = score;
  }
});

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
resetBtn.addEventListener('click', resetGame);


// Загрузка рецептов из JSON
fetch('/data/recipes.json')
  .then(response => response.json())
  .then(data => {
    const recipesBox = document.getElementById('recipes_box');
    
    data.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('recipe-card');
      
      const img = document.createElement('img');
      img.src = recipe.image;
      img.alt = recipe.title;
      card.appendChild(img);
      
      const title = document.createElement('h3');
      title.textContent = recipe.title;
      card.appendChild(title);
      
      const ingredients = document.createElement('p');
      ingredients.textContent = recipe.ingredients;
      card.appendChild(ingredients);
      
      recipesBox.appendChild(card);
    });
  })
  .catch(error => console.error('Ошибка загрузки рецептов:', error));