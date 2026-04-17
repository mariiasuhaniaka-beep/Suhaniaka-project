import { useState } from 'react';
import { api } from '../api/api';
import { FaSearch } from 'react-icons/fa';

function Home() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);

  const searchTracks = async () => {
    try {
      const res = await api.get('/tracks');
      const filtered = res.data.filter((t: any) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
      );
      setTracks(filtered);
    } catch {
      alert('Error searching tracks');
    }
  };

  return (
    <div className="container">
      <h1>🎵 Music Catalog</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={searchTracks}>
          <FaSearch />
        </button>
      </div>

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