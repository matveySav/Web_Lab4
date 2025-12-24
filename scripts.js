const api_url = "https://api.open-meteo.com/v1/forecast";

function russianCities() {
    const cityData = [
        ["Москва",55.7558,37.6173],
        ["Санкт-Петербург",59.9343,30.3351],
        ["Новосибирск",55.0084, 82.9357],
        ["Екатеринбург",56.8389, 60.6057],
        ["Нижний Новгород",56.3269, 44.0059],
        ["Казань",55.7961, 49.1064],
        ["Челябинск",55.1644, 61.4368],
        ["Омск",54.9885, 73.3242],
        ["Самара",53.1959,50.1002],
        ["Ростов-на-Дону", 47.2220,39.7200],
        ["Уфа",54.7351,55.9587],
        ["Красноярск",56.0153, 92.8932],
        ["Пермь",58.0105,56.2294],
        ["Воронеж",51.6608,39.2003],
        ["Волгоград", 48.7080, 44.5133],
        ["Краснодар", 45.0355,38.9753],
        ["Саратов",51.5336, 46.0343],
        ["Тюмень",57.1522, 65.5272],
        ["Тольятти",53.5136, 49.4181],
        ["Ижевск",56.8527,53.2115],
        ["Барнаул",53.3606, 83.7636],
        ["Ульяновск",54.3167, 48.3667],
        ["Иркутск",52.2864, 104.2807],
        ["Хабаровск", 48.4827, 135.0838],
        ["Ярославль",57.6261,39.8845],
        ["Владивосток", 43.1155, 131.8855],
        ["Махачкала", 42.9849, 47.5047],
        ["Томск",56.4846, 84.9476],
        ["Оренбург",51.7677,55.0969],
        ["Кемерово",55.3547, 86.0873],
        ["Новокузнецк",53.7865, 87.1552],
        ["Рязань",54.6292,39.7367],
        ["Астрахань", 46.3497, 48.0408],
        ["Пенза",53.1951, 45.0183],
        ["Набережные Челны",55.7436,52.3959],
        ["Липецк",52.6088,39.5992],
        ["Тула",54.1930,37.6171],
        ["Киров",58.6036, 49.6680],
        ["Чебоксары",56.1463, 47.2511],
        ["Калининград",54.7104, 20.4522],
        ["Курск",51.7304,36.1926],
        ["Улан-Удэ",51.8345, 107.5846],
        ["Ставрополь", 45.0445, 41.9691],
        ["Сочи", 43.5855,39.7231],
        ["Тверь",56.8587,35.9176],
        ["Магнитогорск",53.3835,59.0314],
        ["Иваново",57.0003, 40.9739],
        ["Брянск",53.2436,34.3634],
        ["Белгород",50.5953,36.5873],
        ["Сургут", 61.2541, 73.3962],
        ["Владимир",56.1290, 40.4066],
        ["Нижний Тагил",57.9101,59.9813],
        ["Архангельск", 64.5393, 40.5187],
        ["Чита",52.0333, 113.5000],
        ["Симферополь", 44.9521,34.1024],
        ["Калуга",54.5138,36.2612],
        ["Смоленск",54.7826,32.0453],
        ["Волжский", 48.7937, 44.7741],
        ["Саранск",54.1874, 45.1839],
        ["Череповец",59.1333,37.9000],
        ["Курган",55.4408, 65.3411],
        ["Орёл",52.9704,36.0645],
        ["Вологда",59.2205,39.8915],
        ["Якутск", 62.0273, 129.7320],
        ["Мурманск", 68.9707,33.0750],
        ["Подольск",55.4312,37.5457],
        ["Петрозаводск", 61.7849,34.3469],
        ["Нижневартовск", 60.9397, 76.5695],
        ["Кострома",57.7679, 40.9269],
        ["Новороссийск", 44.7239,37.7708],
        ["Йошкар-Ола",56.6328, 47.8959],
        ["Химки",55.8887,37.4304]
    ];
    return cityData.map(city=>({
        name: city[0],
        lat: city[1],
        lon: city[2]
    }));
}
const weather_map = {
    0: "Ясно",
    1: "Преимущественно ясно", 
    2: "Переменная облачность",
    3: "Пасмурно",
    45: "Туман",
    48: "Изморозь",
    51: "Слабый моросящий дождь",
    53: "Умеренный моросящий дождь", 
    55: "Сильный моросящий дождь",
    56: "Слабый ледяной дождь",
    57: "Сильный ледяной дождь",
    61: "Небольшой дождь",
    63: "Умеренный дождь",
    65: "Сильный дождь",
    66: "Слабый ледяной дождь",
    67: "Сильный ледяной дождь", 
    71: "Небольшой снег",
    73: "Умеренный снег",
    75: "Сильный снег",
    77: "Снежные зерна",
    80: "Слабые ливни",
    81: "Умеренные ливни",
    82: "Сильные ливни",
    85: "Небольшие снегопады",
    86: "Сильные снегопады",
    95: "Гроза",
    96: "Гроза с градом",
    99: "Гроза с сильным градом"
};
const CITIES = russianCities();
let state = {
    currentLocation: null,
    addedCities: [],
    error: null
};

const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorText = document.getElementById('errorText'); 
const current = document.getElementById('current');
const currentWeather = document.getElementById('currentWeather');
const cities = document.getElementById('cities');
const citiesWeather = document.getElementById('citiesWeather');
const noData = document.getElementById('noData');
const refreshBtn = document.getElementById('refresh');
const addCityBtn = document.getElementById('addCity');
const addFirstBtn = document.getElementById('addFirst');
const retryBtn = document.getElementById('retry');
const modal = document.getElementById('modal');
const cityName = document.getElementById('cityName');
const suggestions = document.getElementById('suggestions'); 
const inputError = document.getElementById('inputError');
const saveBtn = document.getElementById('save');
const cancelBtn = document.getElementById('cancel');


document.addEventListener('DOMContentLoaded', () => {     
    loadState();
    setupEvents();
    showLoading();
    if (state.currentLocation ){
        loadWeather();
    } else {
        getLocation();
    }
});

function loadState(){
    const saved = localStorage.getItem('weatherState');
    if (saved) state = JSON.parse(saved);
}
function saveState(){
    localStorage.setItem('weatherState', JSON.stringify(state));
}

function setupEvents(){
    refreshBtn.addEventListener('click', () => loadWeather());
    addCityBtn.addEventListener('click', () => showModal());
    addFirstBtn.addEventListener('click', () => showModal());
    retryBtn.addEventListener('click', () => getLocation());
    retryBtn.addEventListener('click', () => loadWeather());
    saveBtn.addEventListener('click', () => addCity());
    cancelBtn.addEventListener('click', () => hideModal());
    cityName.addEventListener('input', () => showSuggestions(cityName.value));
}
function getLocation(){
    if (!navigator.geolocation){
        showError("Геолокация не поддерживается браузером");
        hideLoading();
        showNoData();
        return; 
    }
    navigator.geolocation.getCurrentPosition(
        function(position){
            state.currentLocation = {
                lat: position.coords.latitude,  
                lon: position.coords.longitude,
                name: "Текущее местоположение"
            };
            saveState();
            loadWeather();
        },
        function(){
            showError("Не удалось получить местоположение");
            hideLoading();
        }
    );
}
// -------------------
function loadWeather(){
    showLoading();
    state.error = null;
    let locations = [];
    
    if (state.currentLocation) locations.push(state.currentLocation);
    state.addedCities.forEach(function(city){
        locations.push(city);
    });
    
    if (locations.length === 0){
        hideLoading();
        showNoData();
        return;
    }
    
    let promises = [];
    locations.forEach(function(location){
        promises.push(getWeatherAPI(location.lat, location.lon, location.name));
    });
    
    let completed = 0;
    let results = [];
    promises.forEach(function(promise){
        // console.log(promise)
        promise.then(function(data){
            results.push(data);
            completed++;
            if (completed === promises.length) showWeather(results);
        }).catch(function(err){
            console.log("Ошибка загрузки", err);
            completed++;
            if (completed === promises.length) showWeather(results);
        });
    });
}

function getWeatherAPI(lat, lon, name){
    const url = api_url + "?latitude=" + lat + "&longitude=" + lon + "&daily=temperature_2m_max,weather_code,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto";
    return fetch(url)
            .then(function(response){
                if (!response.ok){
                    throw new Error("Ошибка API " + response.status);
                }
                return response.json();
            })
            .then(function(data){
                // console.log(data);
                const days = [];
                for (let i = 0; i < 5; i++){ // 5
                    const date = new Date(data.daily.time[i]);
                    const dayName = getDayName(date); 
                    days.push({
                        date: data.daily.time[i],
                        dayName: dayName,
                        weatherCode: weather_map[data.daily.weather_code[i]],
                        tempMax: Math.round(data.daily.temperature_2m_max[i]),
                        tempMin: Math.round(data.daily.temperature_2m_min[i]),
                        tempAvg: Math.round((data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) /2),
                        precipitation: data.daily.precipitation_sum[i],
                        wind: data.daily.windspeed_10m_max[i],
                        isToday: i === 0
                    });
                }
                return{
                    name: name,
                    days: days
                };

            })
            .catch(function(error){
                console.log(error);
            });
    }

function getDayName(date){
    const days = ["Воскресенье","Понедельник","Вторник", "Среда","Четверг","Пятница","Суббота"];
    return days[date.getDay()];
}
function showWeather(weatherData){
    hideLoading();
    if (weatherData.length === 0){
        showError("Не удалось загрузить данные о погоде");
        return;
    }
    currentWeather.innerHTML = '';
    citiesWeather.innerHTML = '';
    
    let currentData = null;
    let addedData = [];
    weatherData.forEach(function(data){
        if (data.name === "Текущее местоположение"){
            currentData = data;
        } else {
            addedData.push(data);
        }
    });
    
    if (currentData){
        current.classList.remove('hidden');
        createWeatherDisplay(currentData, currentWeather, true);
    }else {
        current.classList.add('hidden');
    }
    
    if (addedData.length > 0){
        cities.classList.remove('hidden');
        noData.classList.add('hidden');
        addedData.forEach(function(cityData){
            createWeatherDisplay(cityData, citiesWeather, false);
        });
    }else {
        cities.classList.add('hidden');
        if (!currentData){
            noData.classList.remove('hidden');
        }
    }
    error.classList.add('hidden');
}

function createWeatherDisplay(weatherData, container, isCurrent){
    const block = document.createElement('div');
    block.className = 'weather-block';
    let daysHtml = '';
    weatherData.days.forEach(function(day){
        daysHtml += `
            <div class="day">
                <h4>${day.dayName}</h4>
                <div class="temp">${day.tempAvg}°C</div>
                <div class="weather">${day.weatherCode}</div>
                <div class="details">
                    <div>Макс: ${day.tempMax}°C</div>
                    <div>Мин: ${day.tempMin}°C</div>
                    <div>Осадки: ${day.precipitation} мм</div>
                    <div>Ветер: ${day.wind} км/ч</div>
                    <div>${day.isToday ? 'Сегодня' : ''}</div>
                </div>
            </div>`;
    });
    
    block.innerHTML = `
        ${isCurrent ? '' : 
            `<h3>${weatherData.name} 
                <button class="remove">Удалить</button>
            </h3>`
        }
        <div class="days">
            ${daysHtml}
        </div>
    `;
    container.appendChild(block);
    
    if (!isCurrent){
        const removeBtn = block.querySelector('.remove');
        removeBtn.addEventListener('click', function(){
            removeCity(weatherData.name);
        });
    }
}

function showModal(){
    modal.classList.remove('hidden');
    cityName.value = '';
    suggestions.innerHTML = '';
    inputError.textContent = '';
    inputError.classList.add('hidden');
}
function hideModal(){
    modal.classList.add('hidden');
}

function showSuggestions(query){
    suggestions.innerHTML = '';
    if (query.length < 2) return;

    const filtered = CITIES.filter(function(city){return city.name.toLowerCase().includes(query.toLowerCase());});
    
    if (filtered.length > 0){
        filtered.forEach(function(city){
            const div = document.createElement('div');
            div.className = 'suggestion';
            div.textContent = city.name;
            div.addEventListener('click', function(){
                cityName.value = city.name;
                suggestions.innerHTML = '';
                });
            suggestions.appendChild(div);
        });
    } else {
        const div = document.createElement('div');
        div.className = 'suggestion';
        div.textContent = 'Город не найден';
        suggestions.appendChild(div);
    }
}

function addCity(){
    const city = cityName.value.trim();
    if (!city){
        showInputError("Введите название города");
        return;
    }
    
    const foundCity = CITIES.find(function(c){
        return c.name.toLowerCase() === city.toLowerCase();
    });
    if (!foundCity){
        showInputError("Город не найден в списке");
        return;
    }
    
    if (state.addedCities.some(function(c){
        return c.name.toLowerCase() === city.toLowerCase();
    })){
        showInputError("Этот город уже добавлен");
        return;
    }
    
    state.addedCities.push({
        name: foundCity.name,
        lat: foundCity.lat,
        lon: foundCity.lon
    });
    
    saveState();
    hideModal();
    loadWeather();
}
function removeCity(cityName){
    state.addedCities = state.addedCities.filter(function(city){
        return city.name !== cityName;
    });
    saveState();
    loadWeather();
}
function showInputError(message){
    inputError.textContent = message;
    inputError.classList.remove('hidden');
}
function showLoading(){
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    current.classList.add('hidden');
    cities.classList.add('hidden');
    noData.classList.add('hidden');
}
function hideLoading(){
    loading.classList.add('hidden');
}
function showError(message){
    state.error = message;
    errorText.textContent = message;
    error.classList.remove('hidden');
    loading.classList.add('hidden');
}
function showNoData(){
    noData.classList.remove('hidden');
    current.classList.add('hidden');
    cities.classList.add('hidden');
    loading.classList.add('hidden');
}