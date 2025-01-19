import { getHistory, addToHistory } from '../storage';

beforeEach(() => {
  localStorage.clear();
});

test('getHistory returns empty array initially', () => {
  expect(getHistory()).toEqual([]);
});

test('addToHistory adds a city', () => {
  addToHistory('Москва');
  expect(getHistory()).toEqual(['Москва']);
});

test('addToHistory maintains maximum 10 cities and no duplicates', () => {
  for (let i = 1; i <= 12; i++) {
    addToHistory(`Город${i}`);
  }
  expect(getHistory().length).toBe(10);
  expect(getHistory()).toEqual([
    'Город12',
    'Город11',
    'Город10',
    'Город9',
    'Город8',
    'Город7',
    'Город6',
    'Город5',
    'Город4',
    'Город3',
  ]);

  addToHistory('Город5');
  expect(getHistory().length).toBe(10);
  expect(getHistory()[0]).toBe('Город5');
});
