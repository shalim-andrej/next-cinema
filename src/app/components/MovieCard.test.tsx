// src/app/components/MovieCard.test.tsx
import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';
import { Movie } from '../api-service';

// Создаем фейковые данные для теста
const mockMovie: Movie = {
  kinopoiskId: 123,
  nameRu: 'Тестовый фильм',
  nameEn: 'Test Movie',
  posterUrlPreview: 'https://example.com/poster.jpg',
  ratingKinopoisk: 8.5,
  year: 2024,
  genres: [{ genre: 'Боевик' }],
};

describe('MovieCard Component', () => {
  it('отображает название, год и рейтинг фильма', () => {
    // Рендерим компонент
    render(<MovieCard movie={mockMovie} index={0} />);

    // Проверяем, что на экране есть нужные элементы
    expect(screen.getByText('Тестовый фильм')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });
});