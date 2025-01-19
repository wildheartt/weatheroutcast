import { render, screen } from '@testing-library/react';
import Weather from '../../components/Weather';
import * as api from '../../utils/api';

jest.mock('../../utils/api');

test('renders weather information', async () => {
  api.getWeatherByCity.mockResolvedValue({
    name: 'Москва',
    main: { temp: 10 },
    weather: [{ icon: '01d', description: 'ясно' }],
    coord: { lat: 55.7558, lon: 37.6173 },
  });

  render(<Weather />);

  expect(await screen.findByText('Москва')).toBeInTheDocument();
  expect(await screen.findByText('10°C')).toBeInTheDocument();
});
