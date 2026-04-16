import { useEffect, useState } from 'react';
import { api } from '../api/api';

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
    <div>
      <h2>Tracks</h2>
      <ul>
        {tracks.map((t: any) => (
          <li key={t.id}>
            {t.title} — {t.artist}
            <button onClick={() => deleteTrack(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tracks;