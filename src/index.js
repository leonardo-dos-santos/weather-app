import axios from 'axios';
import './style.css';

async function getWeather(location) {
  const apiKey = 'YOUR_API_KEY';
  const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
  return response.data;
}

function displayWeather(data) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>${data.location.name}</h1>
    <p>${data.current.temp_c}°C / ${data.current.temp_f}°F</p>
    <p>${data.current.condition.text}</p>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');

  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Enter location');
  button.textContent = 'Get Weather';

  form.appendChild(input);
  form.appendChild(button);
  document.getElementById('app').appendChild(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = input.value;
    const weatherData = await getWeather(location);
    displayWeather(weatherData);
  });
});
