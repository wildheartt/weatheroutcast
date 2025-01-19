import { getHistory } from '../utils/storage';
import { getWeatherByCity } from '../utils/api';

const History = () => {
  const historyDiv = document.getElementById('history');
  const history = getHistory();

  if (history.length === 0) return;

  const list = document.createElement('ul');
  list.className = 'history-list';

  history.forEach((city) => {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.addEventListener('click', async () => {
      const event = new Event('citySelected');
      event.city = city;
      window.dispatchEvent(event);
    });
    list.appendChild(listItem);
  });

  historyDiv.innerHTML = '<h3>История</h3>';
  historyDiv.appendChild(list);

  window.addEventListener('citySelected', async (e) => {
    const city = e.city;
    const weatherModule = await import('./Weather');
    weatherModule.default();
  });

  return historyDiv;
};

export default History;
