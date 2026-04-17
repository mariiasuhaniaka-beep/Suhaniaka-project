import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { FaMusic, FaTrash, FaCompactDisc } from 'react-icons/fa';

function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  Promise.all([
    api.get('/tracks'),
    api.get('/album')
  ])
    .then(([tracksRes, albumsRes]) => {
      console.log("TRACKS:", tracksRes.data);
      console.log("ALBUMS:", albumsRes.data);

      setTracks(tracksRes.data);
      setAlbums(albumsRes.data);
    })
    .catch((err) => {
      console.log("ERROR:", err);
      setError('Error loading data');
    })
    .finally(() => setLoading(false));
  }, []);

  const deleteTrack = async (id: number) => {
    await api.delete(`/tracks/${id}`);
    setTracks(tracks.filter((t: any) => t.id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      
      {/* 🎵 TRACKS */}
      <h2>Треки</h2>
      <ul>
        {tracks.map((t: any) => (
          <li key={t.id} className="track-card">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaMusic />
                <strong>{t.title}</strong>
              </div>
              <div style={{ opacity: 0.7 }}>
                {t.artist} ({t.year})
              </div>
            </div>

            <button onClick={() => deleteTrack(t.id)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      {/* 💿 ALBUMS */}
      <h2 style={{ marginTop: '30px' }}>Рекомендації Альбомів</h2>
      <ul>
        {albums.map((a: any) => (
          <li key={a.id} className="track-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaCompactDisc />
              <strong>{a.title}</strong>
            </div>
            <div style={{ opacity: 0.7 }}>
              {a.artist}
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Tracks;