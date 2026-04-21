import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { FaCompactDisc, FaSearch } from 'react-icons/fa';

function Home() {
  // стан для пошукового запиту
  const [query, setQuery] = useState('');

  // список знайдених треків
  const [tracks, setTracks] = useState([]);

  // список альбомів
  const [albums, setAlbums] = useState([]);

  // стан завантаження (щоб показати "Loading...")
  const [loading, setLoading] = useState(true);

  // стан помилки
  const [error, setError] = useState('');

  // 🔥 виконується один раз після відкриття сторінки
  useEffect(() => {
    // робимо запит на бекенд за альбомами
    api.get('/album')
      .then((res) => {
        // зберігаємо альбоми у state
        setAlbums(res.data);
      })
      .catch((err) => {
        // якщо помилка — показуємо її
        console.log(err);
        setError('Error loading albums');
      })
      // виконується в будь-якому випадку
      .finally(() => setLoading(false));
  }, []);

  // 🔍 функція пошуку треків
  const searchTracks = async () => {
    try {
      // отримуємо всі треки з бекенду
      const res = await api.get('/tracks');

      // фільтруємо їх по назві або виконавцю
      const filtered = res.data.filter((t: any) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
      );

      // записуємо результат у state
      setTracks(filtered);
    } catch {
      // якщо помилка — показуємо alert
      alert('Error searching tracks');
    }
  };

  // якщо ще йде завантаження — показуємо текст
  if (loading) return <p>Loading...</p>;

  // якщо є помилка — показуємо її
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      {/* заголовок сторінки */}
      <h1>🎵 Каталог музики</h1>

      {/* ===== БЛОК ПОШУКУ ===== */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Пошук за назвою або співаком..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // оновлюємо state
        />

        {/* кнопка запуску пошуку */}
        <button onClick={searchTracks}>
          <FaSearch />
        </button>
      </div>

      {/* ===== СПИСОК ТРЕКІВ ===== */}
      <ul>
        {tracks.map((t: any) => (
          <li key={t.id} className="track-card">
            <strong>{t.title}</strong> — {t.artist}
          </li>
        ))}
      </ul>

      {/* ===== СПИСОК АЛЬБОМІВ ===== */}
      <h2 style={{ marginTop: '30px' }}>Рекомендації Альбомів</h2>

      <ul>
        {albums.map((a: any) => (
          <li key={a.id} className="track-card">
            
            {/* блок з іконкою і назвою */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaCompactDisc /> {/* іконка альбому */}
              <strong>{a.title}</strong>
            </div>

            {/* виконавець */}
            <div style={{ opacity: 0.7 }}>
              {a.artist}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;