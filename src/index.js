import './styles.css';
import Weather from './components/Weather';
import History from './components/History';

const app = document.getElementById('app');

const render = () => {
  app.innerHTML = `
    <div class="container">
    <h1>Прогноз погода</h1>
    <div id="weather"></div>
    <div id="history"></div>
    </div>
    `;
  Weather();
  History();
};

render();
