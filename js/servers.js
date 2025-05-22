// Валидация номера
function validatePhone() {
    const phoneInput = document.getElementById('phoneInput').value.trim();
    const message = document.getElementById('message');
    const kgPhone = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/;

    if (kgPhone.test(phoneInput)) {
        message.textContent = 'Телефон принят! Мы скоро добавим Вас в группу!';
        message.className = 'message success';
    } 
    else {
        message.textContent = 'Неверный формат телефона';
        message.className = 'message error';
    }
}

// Converter
const somInput = document.querySelector('#som');
const diamondInput = document.querySelector('#diamond');
const goldInput = document.querySelector('#gold');

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', './data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);

            if (element.id === 'som') {
                targetElement1.value = (element.value / data.diamond).toFixed(2);
                targetElement2.value = (element.value / data.gold).toFixed(2);
            }
            if (element.id === 'diamond') {
                targetElement1.value = (element.value * data.diamond).toFixed(2);
                targetElement2.value = ((element.value * data.diamond) / data.gold).toFixed(2);
            }
            if (element.id === 'gold') {
                targetElement1.value = (element.value * data.gold).toFixed(2);
                targetElement2.value = ((element.value * data.gold) / data.diamond).toFixed(2);
            }
            if (element.value === '') {
                targetElement1.value = '';
                targetElement2.value = '';
            }
        }
    }
}
converter(somInput, diamondInput, goldInput);
converter(diamondInput, somInput, goldInput);
converter(goldInput, somInput, diamondInput);

// Погода 
const searchInput = document.querySelector('.cityName');
const searchButton = document.querySelector('#search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const BASE_API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

searchButton.onclick = () => {
    if(searchInput.value !== ''){
        fetch(`${BASE_API}?q=${searchInput.value}&units=metric&lang=fr&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        city.innerHTML = data.name ? data.name : 'City not found';
        temp.innerHTML = Math.round(data.main.temp) + '℃';
    })
    searchInput.value = '';
    }
    else{
        city.innerHTML = 'Please enter a city name';
        temp.innerHTML = '';
    }
}