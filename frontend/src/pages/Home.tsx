import { useState } from 'react';
import { api } from '../api/api';
import { FaSearch } from 'react-icons/fa';

function Home() {
  // стан пошукового запиту
  const [query, setQuery] = useState('');
  // список треків, які відображаються
  const [tracks, setTracks] = useState([]);
  // функція пошуку треків
  const searchTracks = async () => {
    try {
      // отримуємо всі треки з бекенду
      const res = await api.get('/tracks');
      // фільтруємо по title або artist (локальний пошук на фронті)
      const filtered = res.data.filter((t: any) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
      );

      // оновлюємо список для відображення
      setTracks(filtered);
    } catch {
      // якщо запит впав — показуємо помилку
      alert('Error searching tracks');
    }
  };
  return (
    <div className="container">
      {/* заголовок сторінки */}
      <h1>🎵 Каталог музики</h1>
      {/* блок пошуку */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Пошук за назвою або співаком..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // оновлення стану вводу
        />
        {/* кнопка запуску пошуку */}
        <button onClick={searchTracks}>
          <FaSearch />
        </button>
      </div>
      {/* список треків */}
      <ul>
        {tracks.map((t: any) => (
          <li key={t.id} className="track-card">
            <strong>{t.title}</strong> — {t.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;