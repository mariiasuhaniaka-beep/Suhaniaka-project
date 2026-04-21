import { useState } from 'react';
import { api } from '../api/api';

function CreateTrack() {
  // state для назви треку
  const [title, setTitle] = useState('');

  // state для виконавця
  const [artist, setArtist] = useState('');

  // state для року
  const [year, setYear] = useState('');

  // state для помилок (валідація)
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ОЧИЩАЄМО ПОМИЛКУ ПЕРЕД ВАЛІДАЦІЄЮ
    setError('');

    // ВАЛІДАЦІЯ 
    if (!title.trim()) {
      setError('Введи назву треку');
      return;
    }

    if (!artist.trim()) {
      setError('Введи виконавця');
      return;
    }

    if (!year.trim()) {
      setError('Введи рік');
      return;
    }

    if (isNaN(Number(year))) {
      setError('Рік має бути числом');
      return;
    }

    // ЗАПИТ НА БЕКЕНД
    try {
      await api.post('/tracks', {
        title,
        artist,
        year: Number(year),
      });

      alert('Track added!');

      // очищення форми після успіху
      setTitle('');
      setArtist('');
      setYear('');
    } catch {
      setError('Помилка при створенні треку');
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* ПОМИЛКА */}
      {error && (
        <p style={{ color: '#f472b6', marginBottom: '10px' }}>
          {error}
        </p>
      )}

      {/* поле назви */}
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* поле виконавця */}
      <input
        placeholder="Artist"
        value={artist}
        onChange={e => setArtist(e.target.value)}
      />

      {/* поле року */}
      <input
        placeholder="Year"
        value={year}
        onChange={e => setYear(e.target.value)}
      />

      {/* кнопка */}
      <button type="submit">Add</button>
    </form>
  );
}

export default CreateTrack;