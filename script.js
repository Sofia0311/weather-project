const checkbox = document.getElementById('checkbox');
const videoFront = document.getElementById('bgVideo');
const videoBack = document.getElementById('bgVideoBack');

function applyTheme(isDark) {
  if (isDark) {
    document.body.setAttribute('dark', '');
    localStorage.setItem('theme', 'dark');
    videoFront.src = "dark.MP4";
    videoBack.src = "dark-blur.mp4";
  } else {
    document.body.removeAttribute('dark');
    localStorage.setItem('theme', 'light');
    videoFront.src = "white.MP4";
    videoBack.src = "white-blur.mp4";
  }
  videoFront.load();
  videoBack.load();
  videoFront.play();
  videoBack.play();
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  checkbox.checked = savedTheme === 'dark';
  applyTheme(checkbox.checked);
});

checkbox.addEventListener('change', () => {
  applyTheme(checkbox.checked);
});

// Переключение форм
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Отправка формы входа
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      alert('Вход успешен! Токен: ' + data.token);
      localStorage.setItem('authToken', data.token); // исправлено
      window.location.href = 'weather.html'; // добавлено
    } else {
      alert('Ошибка входа: ' + data.error);
    }
  } catch (error) {
    alert('Сетевая ошибка, попробуйте позже.');
    console.error(error);
  }
});

// Отправка формы регистрации
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const res = await fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem('authToken', data.token);
      window.location.href = 'weather.html';
    } else {
      alert("Неверный логин или пароль");
    }
  } catch (error) {
    alert('Сетевая ошибка, попробуйте позже.');
    console.error(error);
  }
});

