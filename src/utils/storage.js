const STORAGE_KEY = 'weatherAppHistory';

export const getHistory = () => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

export const addToHistory = (city) => {
  let history = getHistory();
  history = history.filter((item) => item.toLowerCase() !== city.toLowerCase());
  history.unshift(city);
  if (history.length > 10) history.pop();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};
