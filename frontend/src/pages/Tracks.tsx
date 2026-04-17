import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { FaMusic, FaTrash } from 'react-icons/fa';

function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/tracks')
      .then(res => setTracks(res.data))
      .catch(() => setError('Error loading tracks'))
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
    <h2>Tracks</h2>
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
  </div>
);
}
export default Tracks;