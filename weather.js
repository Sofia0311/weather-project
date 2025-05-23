if (window.location.pathname.includes('weather.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log("Страница weather.html загружена");

    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = 'index.html';
      return;
    }

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Moscow,ru,uk&appid=419bd2ed366db57d50cae24743bbd8e3&units=metric&lang=ru')
      .then(res => res.json())
      .then(data => {
        console.log("Погода получена:", data);

        const temp = data.main.temp;
        const wind = data.wind.speed;
        const description = data.weather[0].description;

        document.getElementById('temp').textContent = (`Температура: ${Math.round(temp)}°C`);
        document.getElementById('wind').textContent = `Ветер: ${Math.round(wind)} м/с`;
        document.getElementById('description').textContent = `Состояние: ${description}`;
      })
      .catch(err => {
        console.error("Ошибка получения погоды:", err);
      });
  });
}
